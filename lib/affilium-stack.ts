import * as cdk from 'aws-cdk-lib';

import { EndpointType, LambdaRestApi, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';

import { Construct } from 'constructs';

export class AffiliumStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const itemTable = process.env.TABLE_NAME ?? 'items'
    const dynamoTable = new Table(this, 'items', {
      partitionKey: {
        name: 'itemId',
        type: AttributeType.STRING
      },
      tableName: itemTable,
    });
    
    const createLambda = new Function(this, 'createItemFunction', {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset('./dist'),
      handler: 'handler',
      environment: {
        REGION: this.region,
        ITEMS_TABLE_NAME: itemTable
    }
    });

    dynamoTable.grantReadWriteData(createLambda);

    const api = new LambdaRestApi(this, 'API', {
      handler: createLambda,
    })

    api.addApiKey('test')
  }
}

