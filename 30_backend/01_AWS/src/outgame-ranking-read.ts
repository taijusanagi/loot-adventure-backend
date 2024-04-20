import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { AttributeValue, DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION });
const TABLE_STATUS = process.env.TABLE_STATUS;
const TABLE_RANKING = process.env.TABLE_RANKING;
const tableGSI = process.env.tableGSI;

export const handler = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  event: APIGatewayEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: Context,
): Promise<APIGatewayProxyResult> => {
  console.log(event);

  const command = new QueryCommand(
    {
      TableName: TABLE_RANKING,
      IndexName: tableGSI,
      KeyConditionExpression: '#Pk = :PkValue', // 条件を指定
      ExpressionAttributeNames : {
        "#Pk"  : 'isActive'
      },
      ExpressionAttributeValues: {
        ':PkValue': {S: '01_active'}
      },
      ScanIndexForward: false,
      Limit: 50,
    }
  );

  const rankingData = await dynamo.send(command);
  console.log(rankingData['Items']);
  let items: object[] = [];
  let _item;
  let _index = 1;
  rankingData['Items']?.map((item) => {
    _item = unmarshall(item);
    _item.ranking = _index;
    _index++;

    console.log(_item);
    items.push(_item);
  })
  
  console.log(items);

  return {
    statusCode: 200,
    body: JSON.stringify(items),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Content-Type": 'application/json',
      "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
    },
  };
};