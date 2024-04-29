import {
    Duration,
    Stack,
    StackProps,
    aws_apigateway,
    aws_dynamodb,
} from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';
import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as Iam from 'aws-cdk-lib/aws-iam';
import { SecretValue } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dotenv from 'dotenv';
import { Cors } from 'aws-cdk-lib/aws-apigateway';
import * as logs from 'aws-cdk-lib/aws-logs';

dotenv.config();
const SUFFIX = process.env.STAGE;
const PACKAGE_LOCK_JSON = 'src/package-lock.json';
const getLambdaOptions = ({
  entry,
  environment,
  iamRole
}: {
  entry: string;
  environment?: {
    [key: string]: string;
  };
  iamRole: iam.Role;
}): NodejsFunctionProps => {
  return {
    entry,
    depsLockFilePath: 'src/package-lock.json',
    handler: 'handler',
    runtime: Runtime.NODEJS_18_X,
    memorySize: 512,
    timeout: Duration.seconds(10),
    logRetention: 30,
    environment,
    role:iamRole 
  };
};

export class LootAdventureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // --------------------------------------------------
    // Resources | DynamoDB
    // --------------------------------------------------
    const dynamoDbStatus = new aws_dynamodb.TableV2(this, 'La-Tba-Status' + SUFFIX, {
      partitionKey: {
        name: 'userId',
        type: aws_dynamodb.AttributeType.STRING,
      },
    });
    dynamoDbStatus.addGlobalSecondaryIndex({
      indexName: 'gsiRanking',
      partitionKey: { name: 'isActive', type: aws_dynamodb.AttributeType.STRING },
      sortKey: {name: 'totalPt', type: aws_dynamodb.AttributeType.NUMBER}
    })

    const dynamoDbRanking = new aws_dynamodb.TableV2(this, 'La-Eoa-Ranking' + SUFFIX, {
      partitionKey: {
        name: 'eoa',
        type: aws_dynamodb.AttributeType.STRING,
      },
    });
    dynamoDbRanking.addGlobalSecondaryIndex({
      indexName: 'gsiRanking',
      partitionKey: { name: 'isActive', type: aws_dynamodb.AttributeType.STRING },
      sortKey: {name: 'totalPt', type: aws_dynamodb.AttributeType.NUMBER}
    })

    // --------------------------------------------------
    // Resources | Secrets Manager(Private Key for On-Chain TXs)
    // --------------------------------------------------
    const prv00 = new secretsmanager.Secret(this, 'PrivateKeyPool00' + SUFFIX, {
      secretObjectValue: {
        0: SecretValue.unsafePlainText(process.env.key00 as string),
        1: SecretValue.unsafePlainText(process.env.key01 as string),
        2: SecretValue.unsafePlainText(process.env.key02 as string),
        3: SecretValue.unsafePlainText(process.env.key03 as string),
        4: SecretValue.unsafePlainText(process.env.key04 as string),
        5: SecretValue.unsafePlainText(process.env.key05 as string),
        6: SecretValue.unsafePlainText(process.env.key06 as string),
        7: SecretValue.unsafePlainText(process.env.key07 as string),
        8: SecretValue.unsafePlainText(process.env.key08 as string),
        9: SecretValue.unsafePlainText(process.env.key09 as string),
      },
    })

    // --------------------------------------------------
    // Resources | IAM
    // --------------------------------------------------
    // For Lambda(Allow connect to DynamoDB)
    const lambda_basic_policy = new iam.ManagedPolicy(this, 'Lambda_basic_policy' + SUFFIX, {
      managedPolicyName: 'lambda_basic_policy' + SUFFIX,
      description: 'Lambda basic execution policy',
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['logs:*'],
          resources: ['arn:aws:logs:*:*:*'],
        }),
      ],
    });

    const iam_role_lambda_connectDb = new iam.Role(this, 'lambda_connectDb' + SUFFIX, {
      roleName: 'iam_role_lambda_connectDb' + SUFFIX,
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });
    iam_role_lambda_connectDb.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
    iam_role_lambda_connectDb.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));
    iam_role_lambda_connectDb.addManagedPolicy(lambda_basic_policy);　// Attach Policy(Create above)

    // --------------------------------------------------
    // Resources | Lambda
    // --------------------------------------------------
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const lambdaReadAccount = new lambda.NodejsFunction(
      this,
      'readAccount' + SUFFIX,
      getLambdaOptions({
        entry: 'src/outgame-tba-read.ts',
        environment: {
          LOG_LEVEL: 'DEBUG',
          ERC6551_REGISTRY: process.env.ERC6551_REGISTRY as string,
          ERC6551_ACCOUNT: process.env.ERC6551_ACCOUNT as string,
          NFT_CONTRACT: process.env.NFT_CONTRACT as string,
        },
        iamRole: iam_role_lambda_connectDb,
      }),
    );

    const lambdaReadRanking = new lambda.NodejsFunction(
      this,
      'readRanking' + SUFFIX,
      getLambdaOptions({
        entry: 'src/outgame-ranking-read.ts',
        environment: {
          LOG_LEVEL: 'DEBUG',
          TABLE_STATUS: dynamoDbStatus.tableName,
          TABLE_RANKING: dynamoDbRanking.tableName,
          tableGSI: 'gsiRanking'
        },
        iamRole: iam_role_lambda_connectDb,
      }),
    );
    
    /* eslint-disable no-unused-vars */
    const lambdaAuthPreSignup = new lambda.NodejsFunction(this, 'preSignup' + SUFFIX, {
        entry: 'src/auth-signup-confirm.ts',
        depsLockFilePath: PACKAGE_LOCK_JSON,
        handler: 'handler',
        runtime: Runtime.NODEJS_18_X,
        memorySize: 512,
        timeout: cdk.Duration.seconds(10),
        environment: {
          LOG_LEVEL: 'DEBUG',
        },
      });
  
      const lambdaAuthCreateChallenge = new lambda.NodejsFunction(
        this,
        'createChallenge' + SUFFIX,
        {
          entry: 'src/auth-challenge-create.ts',
          depsLockFilePath: PACKAGE_LOCK_JSON,
          handler: 'handler',
          runtime: Runtime.NODEJS_18_X,
          memorySize: 512,
          timeout: cdk.Duration.seconds(10),
          environment: {
            LOG_LEVEL: 'DEBUG',
          },
        },
      );
  
      const lambdaAuthDefineChallenge = new lambda.NodejsFunction(
        this,
        'defineChallenge' + SUFFIX,
        {
          entry: 'src/auth-challenge-define.ts',
          depsLockFilePath: PACKAGE_LOCK_JSON,
          handler: 'handler',
          runtime: Runtime.NODEJS_18_X,
          memorySize: 512,
          timeout: cdk.Duration.seconds(10),
          environment: {
            LOG_LEVEL: 'DEBUG',
          },
        },
      );
  
      const lambdaAuthVerifyChallenge = new lambda.NodejsFunction(
        this,
        'verifyChallenge' + SUFFIX,
        {
          entry: 'src/auth-challenge-verify.ts',
          depsLockFilePath: PACKAGE_LOCK_JSON,
          handler: 'handler',
          runtime: Runtime.NODEJS_18_X,
          memorySize: 512,
          timeout: cdk.Duration.seconds(10),
          environment: {
            LOG_LEVEL: 'DEBUG',
            JWT_SECRET: 'xx',
          },
        },
      );

      const lambdaBinMintCoinToken = new lambda.NodejsFunction(
        this,
        'mintCoinToken' + SUFFIX,
        {
          entry: 'src/bin-mint-cointoken.ts',
          depsLockFilePath: PACKAGE_LOCK_JSON,
          handler: 'handler',
          runtime: Runtime.NODEJS_18_X,
          memorySize: 512,
          timeout: cdk.Duration.seconds(10),
          environment: {
            LOG_LEVEL: 'DEBUG',
            SSM_NAME: prv00.secretName,
            ADDRESS_COIN_TOKEN: process.env.COIN_FT as string,
            ADDRESS_SOUL_MINTER: process.env.SOUL_MINTER as string
          },
        },
      );

      const lambdaBinSeizureEquip = new lambda.NodejsFunction(
        this,
        'seizureEquipment' + SUFFIX,
        {
          entry: 'src/bin-seizure-equipment.ts',
          depsLockFilePath: PACKAGE_LOCK_JSON,
          handler: 'handler',
          runtime: Runtime.NODEJS_18_X,
          memorySize: 512,
          timeout: cdk.Duration.seconds(10),
          environment: {
            LOG_LEVEL: 'DEBUG',
            SSM_NAME: prv00.secretName,
            ADDRESS_SOUL_CONTROLER: process.env.SOUL_CONTROLER as string
          },
        },
      );

      const lambdaBinSetNftOffGame = new lambda.NodejsFunction(
        this,
        'setNftOffGame' + SUFFIX,
        {
          entry: 'src/bin-setnft-offgame.ts',
          depsLockFilePath: PACKAGE_LOCK_JSON,
          handler: 'handler',
          runtime: Runtime.NODEJS_18_X,
          memorySize: 512,
          timeout: cdk.Duration.seconds(10),
          environment: {
            LOG_LEVEL: 'DEBUG',
            SSM_NAME: prv00.secretName,
            ADDRESS_EQUIPMENT_NFT: process.env.EQUIPMENT_NFT as string,
            ADDRESS_SOUL_CONTROLER: process.env.SOUL_CONTROLER as string
          },
        },
      );

      const lambdaBinAuthorize = new lambda.NodejsFunction(
        this,
        'onChainAuthorize' + SUFFIX,
        {
          entry: 'src/bin-authorize-wallet.ts',
          depsLockFilePath: PACKAGE_LOCK_JSON,
          handler: 'handler',
          runtime: Runtime.NODEJS_18_X,
          memorySize: 512,
          timeout: cdk.Duration.seconds(10),
          environment: {
            LOG_LEVEL: 'DEBUG',
            ADDRESS_SOUL_LOOT: process.env.SOUL_LOOT as string,
            ADDRESS_ERC6551_REGISTRY: process.env.ERC6551_REGISTRY as string,
            ADDRESS_ERC6551_ACCOUNT: process.env.ERC6551_ACCOUNT as string,
            CHAIN_ID: process.env.CHAIN_ID as string
          },
        },
      );
      
      const lambdaWriteDungeon = new lambda.NodejsFunction(
        this,
        'writeDungeon' + SUFFIX,
        getLambdaOptions({
          entry: 'src/outgame-dungeon-result-write.ts',
          environment: {
            LOG_LEVEL: 'DEBUG',
            TABLE_STATUS: dynamoDbStatus.tableName,
            TABLE_RANKING: dynamoDbRanking.tableName,
            FUNCTION_MINT_COIN: lambdaBinMintCoinToken.functionName,
            FUNCTION_SEIZURE_EQUIP: lambdaBinSeizureEquip.functionName,
            FUNCTION_SETNFT_OFFGAME: lambdaBinSetNftOffGame.functionName,
            FUNCTION_AUTHORIZE: lambdaBinAuthorize.functionName
          },
          iamRole: iam_role_lambda_connectDb,
        }),
      );

    // const lambdaAuthorizerFunction = new lambda.NodejsFunction(
    //   this,
    //   'authorizeRequest',
    //   getLambdaOptions({
    //     entry: 'src/lambda-authorizor.ts',
    //     environment: {
    //       LOG_LEVEL: 'DEBUG',
    //       COGNITO_USERPOOL_ID: process.env.COGNITO_USERPOOL_ID as string,
    //       COGNITO_TOKEN_USE: process.env.COGNITO_TOKEN_USE as string,
    //       COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID as string,
    //     },
    //   }),
    // );

    // --------------------------------------------------
    // Resources | CloudWatchLogs
    // --------------------------------------------------
    const accessLogGroup = new logs.LogGroup(this, 'AccessLog' + SUFFIX);

    // --------------------------------------------------
    // Resources | API Gateway
    // --------------------------------------------------
    const restApi = new aws_apigateway.RestApi(this, 'RestAPI', {
      restApiName: `LootAdventureApi` + SUFFIX,
      deployOptions: {
        stageName: 'v1',
        dataTraceEnabled: true,
        accessLogDestination: new aws_apigateway.LogGroupLogDestination(accessLogGroup),
        accessLogFormat: aws_apigateway.AccessLogFormat.clf(),
      },
      defaultCorsPreflightOptions: {
        allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
        allowMethods: aws_apigateway.Cors.ALL_METHODS,
        allowHeaders: aws_apigateway.Cors.DEFAULT_HEADERS,
        statusCode: 200,
      },
      cloudWatchRole: true
    });

    // ---------------------------------------------------------------------------------
    // Config for connecting resources (Lambda<>Secrets Manager)
    // ---------------------------------------------------------------------------------
    prv00.grantRead(lambdaBinMintCoinToken);
    prv00.grantRead(lambdaBinSeizureEquip);
    prv00.grantRead(lambdaBinSetNftOffGame);

    // ---------------------------------------------------------------------------------
    // Config for connecting resources (Lambda<>Lambda)
    // ---------------------------------------------------------------------------------
    lambdaWriteDungeon.addToRolePolicy(new Iam.PolicyStatement({
      effect: Iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [lambdaBinMintCoinToken.functionArn]
    }))
    
    lambdaWriteDungeon.addToRolePolicy(new Iam.PolicyStatement({
      effect: Iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [lambdaBinSeizureEquip.functionArn]
    }))

    lambdaWriteDungeon.addToRolePolicy(new Iam.PolicyStatement({
      effect: Iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [lambdaBinSetNftOffGame.functionArn]
    }))
    lambdaWriteDungeon.addToRolePolicy(new Iam.PolicyStatement({
      effect: Iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [lambdaBinAuthorize.functionArn]
    }))

    // ---------------------------------------------------------------------------------
    // Config for connecting resources (Lambda<>API Gateway)
    // ---------------------------------------------------------------------------------
    // API Gateay<>Lambda
    // const lambdaAuth = new aws_apigateway.TokenAuthorizer(
    //   this,
    //   'lambdaAuthorizer',
    //   {
    //     authorizerName: 'lambdaAuthorizer',
    //     handler: lambdaAuthorizerFunction, //ここでLambda Authorizer用のLambda関数を割り当てる
    //     identitySource: aws_apigateway.IdentitySource.header('Authorization'), //アクセストークンを渡すためのヘッダーを指定
    //   },
    // );
    // API Config | https://xxxx.com/monster/~
    const restApiDungeon = restApi.root.addResource('dungeon');
    const restApiDungeonResult = restApiDungeon.addResource('result');
    restApiDungeonResult.addMethod(
      'POST',
      new aws_apigateway.LambdaIntegration(
        lambdaWriteDungeon
      ),
      // {
      //   authorizer: lambdaAuth, // 定義したLambdaAuthorizerを指定
      // },
    );

    const restApiDungeonRanking = restApiDungeon.addResource('ranking');
    restApiDungeonRanking.addMethod(
      'GET',
      new aws_apigateway.LambdaIntegration(
        lambdaReadRanking
      ),
      // {
      //   authorizer: lambdaAuth, // 定義したLambdaAuthorizerを指定
      // },
    );
  }
}