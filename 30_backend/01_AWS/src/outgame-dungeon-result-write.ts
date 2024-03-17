import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION });
const tableName = process.env.tableRanking;

export const handler = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  event: APIGatewayEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: Context,
): Promise<APIGatewayProxyResult> => {
  console.log(event.body);
  const _body = JSON.parse(event.body as string);
  if(_body?.tba == 'undefined'){
    return {
      statusCode: 502,
      body: JSON.stringify('Error:invalid parameter'),
    };
  }
  const nowDateIso: string = new Date().toISOString();

  // Read a item

  const commandWrite = new PutCommand({
    TableName: tableName,
    Item: {
        "userId": _body.tba,
        "status": _body.status,
        "updatedAt": nowDateIso
    }
  });
  const putResult = await dynamo.send(commandWrite);
  console.log(putResult);
  
  return {
    statusCode: 200,
    body: JSON.stringify(putResult),
  };
};