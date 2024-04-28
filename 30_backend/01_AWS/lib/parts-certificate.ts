import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CertificateProperty } from "./config";
import { HostedZoneConstruct } from "./parts-hosted-zone";

export interface CertificateConstructProps extends CertificateProperty {
  hostedZoneConstruct?: HostedZoneConstruct;
}

export class CertificateConstruct extends Construct {
  readonly certificate: cdk.aws_certificatemanager.ICertificate;

  constructor(scope: Construct, id: string, props: CertificateConstructProps) {
    super(scope, id);

    this.certificate = cdk.aws_certificatemanager.Certificate.fromCertificateArn(
        this,
        "Default",
        props.certificateArn
    );
  }
}