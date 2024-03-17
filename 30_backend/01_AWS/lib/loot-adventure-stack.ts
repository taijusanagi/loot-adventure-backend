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
import { SecretValue } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dotenv from 'dotenv';

dotenv.config();
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
    const dynamoDbCustody = new aws_dynamodb.TableV2(
      this,
      'custodyViaEoa',
      {
        partitionKey: {
          name: 'EOA',
          type: aws_dynamodb.AttributeType.STRING,
        },
      },
    );

    const dynamoDbStaus = new aws_dynamodb.TableV2(this, 'ranking', {
      partitionKey: {
        name: 'userId',
        type: aws_dynamodb.AttributeType.STRING,
      },
    });

    // --------------------------------------------------
    // Resources | Secrets Manager(Private Key for On-Chain TXs)
    // --------------------------------------------------
    const prv00 = new secretsmanager.Secret(this, 'PrivateKeyPool00', {
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
    const lambda_basic_policy = new iam.ManagedPolicy(this, 'Lambda_basic_policy', {
      managedPolicyName: 'lambda_basic_policy',
      description: 'Lambda basic execution policy',
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['logs:*'],
          resources: ['arn:aws:logs:*:*:*'],
        }),
      ],
    });

    const iam_role_lambda_connectDb = new iam.Role(this, 'lambda_connectDb', {
      roleName: 'iam_role_lambda_connectDb',
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
      'readAccount',
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
      'readRanking',
      getLambdaOptions({
        entry: 'src/outgame-ranking-read.ts',
        environment: {
          LOG_LEVEL: 'DEBUG',
          tableRanking: dynamoDbStaus.tableName,
        },
        iamRole: iam_role_lambda_connectDb,
      }),
    );
    
    const lambdaWriteDungeon = new lambda.NodejsFunction(
      this,
      'writeRanking',
      getLambdaOptions({
        entry: 'src/outgame-dungeon-result-write.ts',
        environment: {
          LOG_LEVEL: 'DEBUG',
          tableRanking: dynamoDbStaus.tableName,
        },
        iamRole: iam_role_lambda_connectDb,
      }),
    );
    
    /* eslint-disable no-unused-vars */
    const lambdaAuthPreSignup = new lambda.NodejsFunction(this, 'preSignup', {
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
        'createChallenge',
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
        'defineChallenge',
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
        'verifyChallenge',
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

      const lambdaBinCreateCustody = new lambda.NodejsFunction(
        this,
        'createCustody',
        {
          entry: 'src/bin-create-custody.ts',
          depsLockFilePath: PACKAGE_LOCK_JSON,
          handler: 'handler',
          runtime: Runtime.NODEJS_18_X,
          memorySize: 512,
          timeout: cdk.Duration.seconds(10),
          environment: {
            LOG_LEVEL: 'DEBUG',
            SSM_NAME: prv00.secretName
          },
        },
      );

      const lambdaBinMintXpToken = new lambda.NodejsFunction(
        this,
        'mintXpToken',
        {
          entry: 'src/bin-mint-xptoken.ts',
          depsLockFilePath: PACKAGE_LOCK_JSON,
          handler: 'handler',
          runtime: Runtime.NODEJS_18_X,
          memorySize: 512,
          timeout: cdk.Duration.seconds(10),
          environment: {
            LOG_LEVEL: 'DEBUG',
            SSM_NAME: prv00.secretName
          },
        },
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
    // Resources | API Gateway
    // --------------------------------------------------
    const restApi = new aws_apigateway.RestApi(this, 'RestAPI', {
      restApiName: `restApi`,
      deployOptions: {
        stageName: 'v1',
      },
    });

    // ---------------------------------------------------------------------------------
    // Config for connecting resources (Lambda<>Secrets Manager)
    // ---------------------------------------------------------------------------------
    prv00.grantRead(lambdaBinCreateCustody);
    prv00.grantRead(lambdaBinMintXpToken);

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
  }
}