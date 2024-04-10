import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION });
const tableName = process.env.TABLE_STATUS;
const functionMintCoin = process.env.FUNCTION_MINT_COIN;
const functionSeizureEquip = process.env.FUNCTION_SEIZURE_EQUIP;
let resMintCoin;

export const handler = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  event: APIGatewayEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: Context,
): Promise<APIGatewayProxyResult> => {
  console.log(event);
  const _body = JSON.parse(event.body as string);
  if(_body?.tba == 'undefined' || _body?.isClear == 'undefined' || _body?.amount == 'undefined'){
    return {
      statusCode: 502,
      body: JSON.stringify('Error:invalid parameter'),
    };
  }
  const nowDateIso: string = new Date().toISOString();

  // Write a item to DynamoDB
  const commandWrite = new PutCommand({
    TableName: tableName,
    Item: {
        "userId": _body.tba,
        "status": _body.status,
        "updatedAt": nowDateIso
    }
  });
  const putResult = await dynamo.send(commandWrite);
  console.log('DynamoDB Update!!');

  // Invoke function (Mint COIN-Token)
  const client = new LambdaClient();
  console.log(functionMintCoin);

  if(_body.isClear) {
    // True: zero coin & transferFrom Equipment 
    const command = new InvokeCommand({
      FunctionName: functionMintCoin,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({
        "userId": _body.tba,
        "amount": _body.amount,
        "detail": "Dungeon clear at:" + _body.status.toString()
      }),
    });
    resMintCoin = await client.send(command);
  } else {
    // False: zero coin & transferFrom Equipment 
    const command = new InvokeCommand({
      FunctionName: functionMintCoin,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({
        "userId": _body.tba,
        "amount": _body.amount,
        "detail": "Dungeon clear at:" + _body.status.toString()
      }),
    });
    resMintCoin = await client.send(command);

    const command2 = new InvokeCommand({
      FunctionName: functionSeizureEquip,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({
        "userId": _body.tba
      })
    })
    const resSeizure = await client.send(command2);
    console.log(resSeizure);
  }

  // 処理待ちして、トランザクションの結果を返す（最低限なくなった装備nftのトークンID,Equipmentの分類、名前）
  return {
    statusCode: 200,
    body: JSON.stringify(putResult),
  };
};