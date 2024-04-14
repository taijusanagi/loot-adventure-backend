import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { Uint8ArrayBlobAdapter } from "@aws-sdk/util-stream";

const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION });
const tableName = process.env.TABLE_STATUS;
const functionMintCoin = process.env.FUNCTION_MINT_COIN;
const functionSeizureEquip = process.env.FUNCTION_SEIZURE_EQUIP;
const functionSetNftOffGame = process.env.FUNCTION_SETNFT_OFFGAME;
let resMintCoin;

export const handler = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  event: APIGatewayEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: Context,
): Promise<APIGatewayProxyResult> => {
  console.log('event is :', event.body);
  const _body = JSON.parse(event.body as string);
  if(
    _body?.tba == 'undefined' 
    || _body?.isClear == 'undefined'
    || _body?.amount == 'undefined'
    || _body?.turn == 'undefined'
  ){
    return {
      statusCode: 502,
      body: JSON.stringify('Error:invalid parameter'),
    };
  }
  
  // Read a item from DynamoDB
  const commandRead = new GetCommand({
    TableName: tableName,
    Key: {
      'userId': _body.tba,
    },
  });
  const readResult = await dynamo.send(commandRead);
  console.log(readResult);

  // Get&Update total turns
  let turns;
  if(typeof(readResult.Item?.totalTurns)!='undefined'){
    turns = readResult.Item?.totalTurns;
    turns = turns + _body.turn;
  } else {
    turns = 0;
  }

  // Write a item to DynamoDB
  const totalPt = _body.status * 1000000 + (999999 - turns);
  const nowDateIso: string = new Date().toISOString();
  const commandWrite = new PutCommand({
    TableName: tableName,
    Item: {
      "isActive": "01_active",
      "userId": _body.tba,
      "status": _body.status,
      "totalPt": totalPt,
      "totalTurns": turns,
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

    const res = {
      "isClear": true,
      "txIsSuccess": true,
      "seizureId": 0,
      "seizureType": 99
    }
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
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
    const resSeizureEquipment = await client.send(command2);
    console.log(resSeizureEquipment);
    console.log(resSeizureEquipment?.Payload);
    const tokenIdPayload: Uint8ArrayBlobAdapter = resSeizureEquipment?.Payload as Uint8ArrayBlobAdapter;
    const strSeizureResult = JSON.parse(tokenIdPayload?.transformToString() ?? "{}");

    console.log('seizure_tx result: ',strSeizureResult, ' type: ', typeof(strSeizureResult));

    const command3 = new InvokeCommand({
      FunctionName: functionSetNftOffGame,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({
        "userId": _body.tba
      })
    })
    
    const resSetNftOffGame = await client.send(command3);
    console.log(resSetNftOffGame);

    const res = {
      "isClear": false,
      "txIsSuccess": true,
      "seizureTokenId": JSON.parse(strSeizureResult).tokenId,
      "seizureType": JSON.parse(strSeizureResult).type
    }
    return {
      statusCode: 200,
      body: JSON.stringify(res),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Content-Type": 'application/json',
        "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
      },
    };
  }
};