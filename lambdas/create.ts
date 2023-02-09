import * as dynamo from '@aws-sdk/client-dynamodb';

import { v4 as uuidv4 } from 'uuid';

const TABLE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';

const db = new dynamo.DynamoDB({ region: 'us-east-1' });

export const handler = async (event: any = {}): Promise<any> => {

  if (!event.body) {
    return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
  }

  const item = typeof event.body == 'object' ? event.body : JSON.parse(event.body);

  item[PRIMARY_KEY] = uuidv4();

  const params = {
    TableName: TABLE_NAME,
    Item: item
  };

  try {
    await db.putItem(params);
    return { statusCode: 201, body: '' };
  } catch (dbError) {
    return dbError;
  }
};