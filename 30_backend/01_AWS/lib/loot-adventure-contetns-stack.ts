import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3_deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as dotenv from 'dotenv';

import { WebsiteProperty } from './config'
import { HostedZoneConstruct } from './parts-hosted-zone';
import { CertificateConstruct } from './parts-certificate';

dotenv.config();
const SUFFIX = process.env.STAGE;

export interface WebsiteStackProps extends cdk.StackProps, WebsiteProperty {}

export class LootAdventureContentsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: WebsiteStackProps) {
    super(scope, id, props);

    // --------------------------------------------------
    // Resources | Route53 & Certificate Manager
    // --------------------------------------------------
    // const hostedZoneConstruct = props.hostedZone
    //   ? new HostedZoneConstruct(this, "HostedZoneConstruct" + SUFFIX, {
    //       ...props.hostedZone,
    //     })
    //   : undefined;

    // // ACM Certificate
    // const certificateConstruct = props.certificate
    //   ? new CertificateConstruct(this, "CertificateConstruct", {
    //       ...props.certificate,
    //       hostedZoneConstruct,
    //     })
    //   : undefined;

    // --------------------------------------------------
    // Resources | S3
    // --------------------------------------------------
    const bucket = new s3.Bucket(this, 'S3LaContents' + SUFFIX, {
      bucketName: 'lootadventure-contetns' + SUFFIX,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // --------------------------------------------------
    // Resources | Cloud Front
    // --------------------------------------------------
    // OAC|OriginAccessControl
    const cfnOriginAccessControl = new cloudfront.CfnOriginAccessControl(this, 'OriginAccessControl' + SUFFIX, {
      originAccessControlConfig: {
          name: 'OriginAccessControlForContentsBucket' + SUFFIX,
          originAccessControlOriginType: 's3',
          signingBehavior: 'always',
          signingProtocol: 'sigv4',
          description: 'Access Control',
      },
    }); 
    
    // Cloudfront(distribution)
    const origin = new cloudfront_origins.S3Origin(bucket);
    const distribution = new cloudfront.Distribution(this, 'DistributionId' + SUFFIX, {
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          ttl: cdk.Duration.minutes(1),
          httpStatus: 403,
          responseHttpStatus: 403,
          responsePagePath: "/error.html",
        },
        {
          ttl: cdk.Duration.minutes(1),
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: "/error.html",
        },
      ],
      defaultBehavior: {
        origin: origin,
      },     
    });

    // -------------------------------------------------------------------------
    // Config for connecting resources (S3<>IAM, CloudFront), Bucket Policy
    // -------------------------------------------------------------------------
    const bucketPolicyStatement = new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      effect: iam.Effect.ALLOW,
      principals: [
          new iam.ServicePrincipal('cloudfront.amazonaws.com')
      ],
      resources: [`${bucket.bucketArn}/*`]
    });
    bucketPolicyStatement.addCondition('StringEquals', {
      'AWS:SourceArn': `arn:aws:cloudfront::${cdk.Stack.of(this).account}:distribution/${distribution.distributionId}`
    });
    bucket.addToResourcePolicy(bucketPolicyStatement);
  
    const cfnDistribution = distribution.node.defaultChild as cloudfront.CfnDistribution;
    cfnDistribution.addPropertyOverride('DistributionConfig.Origins.0.OriginAccessControlId', cfnOriginAccessControl.getAtt('Id'));
    cfnDistribution.addPropertyOverride('DistributionConfig.Origins.0.DomainName', bucket.bucketRegionalDomainName);
    cfnDistribution.addOverride('Properties.DistributionConfig.Origins.0.S3OriginConfig.OriginAccessIdentity', '');
    cfnDistribution.addPropertyDeletionOverride('DistributionConfig.Origins.0.CustomOriginConfig');
    
    /**
     *  S3へのファイルをデプロイ(アップロード) 
     */ 
    new s3_deployment.BucketDeployment(this, 'LaS3Deployment' + SUFFIX, {
      sources: [s3_deployment.Source.asset('./lib/assets/')],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ['/assets/*']
    });
  }
}