import {
    Duration,
    Stack,
    StackProps,
    aws_apigateway,
    aws_dynamodb,
  } from 'aws-cdk-lib';
  import { Runtime } from 'aws-cdk-lib/aws-lambda';
  import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';
  import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
  import { Construct } from 'constructs';
  import * as dotenv from 'dotenv';
  
  dotenv.config();
  
  const getLambdaOptions = ({
    entry,
    environment,
  }: {
    entry: string;
    environment?: {
      [key: string]: string;
    };
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
    };
  };
  
  export class ApiGameLogicStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
      super(scope, id, props);
  
      // --------------------------------------------------
      // Resources
      // --------------------------------------------------
  
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const lambdaCreateAccount = new lambda.NodejsFunction(
        this,
        'createAccount',
        getLambdaOptions({
          entry: 'src/create-account.ts',
          environment: {
            LOG_LEVEL: 'DEBUG',
            PRIVATE_KEY: process.env.PRIVATE_KEY as string,
            ERC6551_REGISTRY: process.env.ERC6551_REGISTRY as string,
            ERC6551_ACCOUNT: process.env.ERC6551_ACCOUNT as string,
            NFT_CONTRACT: process.env.NFT_CONTRACT as string,
          },
        }),
      );
  
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const lambdaReadAccount = new lambda.NodejsFunction(
        this,
        'readAccount',
        getLambdaOptions({
          entry: 'src/read-account.ts',
          environment: {
            LOG_LEVEL: 'DEBUG',
            ERC6551_REGISTRY: process.env.ERC6551_REGISTRY as string,
            ERC6551_ACCOUNT: process.env.ERC6551_ACCOUNT as string,
            NFT_CONTRACT: process.env.NFT_CONTRACT as string,
          },
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
  
      // API Gateway
      // const restApi = new aws_apigateway.RestApi(this, 'RestAPI', {
      //   restApiName: `restApi`,
      //   deployOptions: {
      //     stageName: 'v1',
      //   },
      // });
  
      // Dynamo DB
      const dynamoDbDungeonProgress = new aws_dynamodb.TableV2(
        this,
        'dungeonProgress',
        {
          partitionKey: {
            name: 'userId',
            type: aws_dynamodb.AttributeType.STRING,
          },
        },
      );
  
      const dynamoItems = new aws_dynamodb.TableV2(this, 'items', {
        partitionKey: {
          name: 'userId',
          type: aws_dynamodb.AttributeType.STRING,
        },
      });
  
      // ---------------------------------------------------------------------------------
      // Config for connecting resources (ex. Lambda<>API Gateway, Lambda<>DynamoDB...)
      // ---------------------------------------------------------------------------------
      // Lambda Authorizerの定義
      // const lambdaAuth = new aws_apigateway.TokenAuthorizer(
      //   this,
      //   'lambdaAuthorizer',
      //   {
      //     authorizerName: 'lambdaAuthorizer',
      //     handler: lambdaAuthorizerFunction, //ここでLambda Authorizer用のLambda関数を割り当てる
      //     identitySource: aws_apigateway.IdentitySource.header('Authorization'), //アクセストークンを渡すためのヘッダーを指定
      //   },
      // );
      // const restApiTasks = restApi.root.addResource('monster');
  
      // restApiTasks.addMethod(
      //   'GET',
      //   new aws_apigateway.LambdaIntegration(lambdaReadAccount),
      //   {
      //     authorizer: lambdaAuth, // 定義したLambdaAuthorizerを指定
      //   },
      // );
    }
  }