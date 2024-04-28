const path = require('path')
import * as cdk from "aws-cdk-lib"
const dotenv = require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
})

export interface HostZoneProperty {
    zoneName?: string;
    hostedZoneId?: string;
}

export interface CertificateProperty {
    certificateArn: string;
    certificateDomainName?: string;
}

export interface WebsiteProperty {
    hostedZone?: HostZoneProperty;
    certificate?: CertificateProperty;
}

export interface WebSiteStackProperty {
    env?: cdk.Environment;
    props: WebsiteProperty;
  }

export const websiteStackProperty: WebSiteStackProperty = {
    env: {

    },
    props: {
        hostedZone: {
            zoneName: "www"+ process.env.stage +".hub-monsters.com",
        },
        certificate: {
            certificateDomainName: "www"+ process.env.stage +".hub-monsters.com",
            certificateArn: "arn:aws:acm:us-east-1:581784737767:certificate/c58c1a43-9e13-4d70-b5bd-4acac1110b3a"
        },
    }
}