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
  console.log(event);

  const command = new PutCommand({
    TableName: tableName,
    Item: {
        "userId": "22222",
        "point": 0
    }
  });
  const putResult = await dynamo.send(command);
  console.log(putResult);
  
  return {
    statusCode: 200,
    body: JSON.stringify(putResult),
  };
};