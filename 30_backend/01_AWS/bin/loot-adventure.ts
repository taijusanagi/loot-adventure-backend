#!/usr/bin/env node
import { LootAdventureStack } from '../lib/loot-adventure-stack';
import { LootAdventureContentsStack } from '../lib/loot-adventure-contetns-stack';
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';

import { WebsiteStackProps } from '../lib/loot-adventure-contetns-stack';
import { websiteStackProperty } from '../lib/config';

const app = new cdk.App();
const SUFFIX = process.env.stage

new LootAdventureStack(app, 'LootAdventureStack', {
  
});

new LootAdventureContentsStack(app, 'LootAdventureContentsStack-dev', {
    ...websiteStackProperty.props,
})