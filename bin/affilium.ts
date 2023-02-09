#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AffiliumStack } from '../lib/affilium-stack';

const app = new cdk.App();

new AffiliumStack(app, 'AffiliumStack', {

});