import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION });
const tableName = process.env.tableRanking;

export const handler = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  event: APIGatewayEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: Context,
): Promise<APIGatewayProxyResult> => {
  console.log(event);

  const command = new ScanCommand({
    TableName: tableName,
    ExpressionAttributeNames: {
        "#timestamp": "timestamp"
    },
    // FilterExpression: "AttributeName1 = :value1 AND AttributeName2 <= :value2",
    // ExpressionAttributeValues: {
    //     ":value1": "AttributeName1",
    //     ":value2": "AttributeName2"
    // },
    // 取得する属性を指定
    ProjectionExpression: "userId, status, totalTurns, updatedAt",
    // ConsistentRead: true, // 強い整合性の読み取りを行うか
    Segment: 0, // 並列スキャンのセグメント
    TotalSegments: 1, // 並列スキャンの合計セグメント数
    Limit: 25, // 返却するアイテム数
    // 実行に消費された容量ユニットの情報を取得
    ReturnConsumedCapacity: "TOTAL",
    });
  const rankingData = await dynamo.send(command);
  console.log(rankingData);
  return {
    statusCode: 200,
    body: JSON.stringify(rankingData['Items']),
  };
};