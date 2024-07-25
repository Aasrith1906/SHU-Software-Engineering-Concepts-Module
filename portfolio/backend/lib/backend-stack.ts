import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  AmplifyGraphqlApi,
  AmplifyGraphqlDefinition
} from '@aws-amplify/graphql-api-construct';
import * as path from 'path';




export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const amplifyApi = new AmplifyGraphqlApi(this, 'HospitalManagementAPI', {
      apiName: 'HospitalManagementAPI',
      definition: AmplifyGraphqlDefinition.fromFilesAndStrategy(
        [path.join(__dirname, 'schema.sql.graphql')],
        {
          name: 'HospitalManagementSchema',
          dbType: 'MYSQL',
          vpcConfiguration: {
            vpcId: 'vpc-03293c2c6f7620041',
            securityGroupIds: ['sg-026a8e46a822d9c5d'],
            subnetAvailabilityZoneConfig: [
              { subnetId: 'subnet-0c2e728078f8259fd', availabilityZone: 'eu-west-1b' },
              { subnetId: 'subnet-0dbf86d2f46192a0d', availabilityZone: 'eu-west-1a' },
              { subnetId: 'subnet-073c00edb009b4a0e', availabilityZone: 'eu-west-1c' },
            ]
          },
          dbConnectionConfig: {
            databaseName: 'hospitalmanagement',
            port: 3306,
            hostname: 'hospital-management-app.cxv1rdz31qj2.eu-west-1.rds.amazonaws.com',
            secretArn:
              'arn:aws:secretsmanager:eu-west-1:239415019418:secret:hospitalmanagement-rds-pfDhum',
          },
        }
      ),
      authorizationModes: {
        defaultAuthorizationMode: 'API_KEY',
        apiKeyConfig: {
          expires: cdk.Duration.days(30),
        },
      },
    });
  }
}
