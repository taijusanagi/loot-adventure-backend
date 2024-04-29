import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { Uint8ArrayBlobAdapter } from "@aws-sdk/util-stream";

const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION });
const TABLE_STATUS = process.env.TABLE_STATUS;
const TABLE_RANKING = process.env.TABLE_RANKING;
const functionMintCoin = process.env.FUNCTION_MINT_COIN;
const functionSeizureEquip = process.env.FUNCTION_SEIZURE_EQUIP;
// const functionSetNftOffGame = process.env.FUNCTION_SETNFT_OFFGAME;
const functionAuthorize = process.env.FUNCTION_AUTHORIZE;

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
    || _body?.eoa == 'undefined'
    || _body?.isClear == 'undefined'
    || _body?.amount == 'undefined'
    || _body?.turn == 'undefined'
    || _body?.signature == 'undefined'
    || _body?.tokenId == 'undefined'
  ){
    return {
      statusCode: 502,
      body: JSON.stringify('Error:invalid parameter'),
    };
  }
  const client = new LambdaClient();

  /*****************************************
  Validate Player address & NFT owner  
  ******************************************/
  const commandValid = new InvokeCommand({
    FunctionName: functionAuthorize,
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify({
      "userId": _body.tba,
      "eoa": _body.eoa,
      "signature": _body.signature,
      "tokenId": _body.tokenId
    }),
  });
  const valid = await client.send(commandValid);

  if(!valid){
    const res = {
      "isClear": true,
      "txIsSuccess": false,
      "seizureId": 0,
      "seizureType": 99,
      "error message":"Error: Not Authorization"
    }
    return {
      statusCode: 403,
      body: JSON.stringify(res),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Content-Type": 'application/json',
        "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
      },
    };
  }

  /*****************************************
  True: zero coin & transferFrom Equipment  
  ******************************************/
  if(_body.isClear) {
    const command = new InvokeCommand({
      FunctionName: functionMintCoin,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({
        "userId": _body.eoa,
        "amount": _body.amount,
        "detail": "Dungeon clear at:" + _body.status.toString()
      }),
    });
    resMintCoin = await client.send(command);

    // const command2 = new InvokeCommand({
    //   FunctionName: functionSetNftOffGame,
    //   InvocationType: 'RequestResponse',
    //   Payload: JSON.stringify({
    //     "userId": _body.tba
    //   })
    // })
    
    // const resSetNftOffGame = await client.send(command2);
    // console.log(resSetNftOffGame);

    /* 
    Update DyanamoDb
    */
    const nowDateIso: string = new Date().toISOString();
    // Update StatusDb
    const totalPt = await updateStatus(_body.tba, _body.eoa, _body.turn, _body.status, nowDateIso);
    console.log('Update DbStatus is done!!')
    console.log('totalPt=>', totalPt);

    // Write a item to DynamoDB02(Ranking)
    await updateRanking(totalPt, _body.tba, _body.eoa, _body.turn, _body.status, nowDateIso)

    const res = {
      "isClear": true,
      "txIsSuccess": true,
      "seizureId": 0,
      "seizureType": 99
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

  /*****************************************
  False: zero coin & transferFrom Equipment 
  ******************************************/
  } else {
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

    // const command3 = new InvokeCommand({
    //   FunctionName: functionSetNftOffGame,
    //   InvocationType: 'RequestResponse',
    //   Payload: JSON.stringify({
    //     "userId": _body.tba
    //   })
    // })
    
    // const resSetNftOffGame = await client.send(command3);
    // console.log(resSetNftOffGame);


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

const updateStatus = async(
  tba_: string,
  eoa_: string,
  turns_: number,
  status_: number,
  nowDateIso_: string
): Promise<number> =>  {
  const userId = eoa_ + tba_;
  const commandRead = new GetCommand({
    TableName: TABLE_STATUS,
    Key: {
      'userId': eoa_ + tba_
    },
  });
  const readResult = await dynamo.send(commandRead);
  console.log(readResult);
  console.log('Typeof...', typeof(readResult.Item?.totalTurns))
  // Get&Update total turns & Pt
  let turns;
  if(typeof(readResult.Item?.totalTurns)!='undefined'){
    turns = readResult.Item?.totalTurns;
    turns = turns + turns_;
  } else {
    turns = turns_;
  }
  const totalPt = status_ * 1000000 + (999999 - turns);

  let _totalPt;
  if(typeof(readResult.Item?.totalPt)!='undefined'){
    _totalPt = readResult.Item?.totalPt;
  } else {
    _totalPt = 0;
  }

  if(_totalPt <= totalPt) {
    const commandWrite = new PutCommand({
      TableName: TABLE_STATUS,
      Item: {
        "isActive": "01_active",
        "userId": userId,
        "status": status_,
        "totalPt": totalPt,
        "totalTurns": turns,
        "tba": tba_,
        "eoa": eoa_,
        "updatedAt": nowDateIso_
      }
    });
    const putResult = await dynamo.send(commandWrite);
    console.log('Update DB_STATUS: ', putResult);

    return totalPt;
  } else {
    return _totalPt;
  }
}

const updateRanking = async(
  totalPt_: number,
  tba_: string,
  eoa_: string,
  turns_: number,
  status_: number,
  nowDateIso_: string
): Promise<boolean> =>  {
  const commandRead = new GetCommand({
    TableName: TABLE_RANKING,
    Key: {
      'eoa': eoa_,
    },
  });
  const readResult = await dynamo.send(commandRead);

  // Get&Update total turns & Pt
  let totalPt;
  if(typeof(readResult.Item?.totalPt)!='undefined'){
    totalPt = readResult.Item?.totalPt;
  } else {
    totalPt = 0;
  }

  if(totalPt <= totalPt_) {
    const commandWrite = new PutCommand({
      TableName: TABLE_RANKING,
      Item: {
        "isActive": "01_active",
        "eoa": eoa_,
        "tba": tba_,
        "status": status_,
        "totalPt": totalPt_,
        "totalTurns": turns_,
        "updatedAt": nowDateIso_
      }
    });
    const putResult = await dynamo.send(commandWrite);
    console.log('Update DB_RANKING: ', putResult);
    return true;
  } else {
    return false;
  }
}