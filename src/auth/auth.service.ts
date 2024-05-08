import { Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
  AdminInitiateAuthCommandInput,
  AdminCreateUserCommand,
  AdminCreateUserCommandInput,
  AdminConfirmSignUpCommandInput,
  AdminConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { createHmac } from 'crypto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('config');
const { cognitoClientId, cognitoUserPoolId, cognitoClientSecret, cognitoRegion } = config.get('awsCognitoConfig');
const { accessKey, secretKey, region } = config.get('awsConfig');

@Injectable()
export class AuthService {
  private cognitoClient: CognitoIdentityProviderClient;

  constructor() {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: cognitoRegion,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });
  }

  async createUser(email: string, password: string): Promise<any> {
    const params: AdminCreateUserCommandInput = {
      UserPoolId: cognitoUserPoolId,
      Username: email,
      TemporaryPassword: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'email_verified',
          Value: 'true',
        },
      ],
      MessageAction: 'SUPPRESS',
      ClientMetadata: {
        SECRET_HASH: this.calculateSecretHash(email),
      },
    };

    try {
      const command = new AdminCreateUserCommand(params);
      const response = await this.cognitoClient.send(command);
      await this.confirmUserSignup(email);
      return {
        message: 'Success ',
        data: response,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async authenticateUser(email: string, password: string) {
    const params: AdminInitiateAuthCommandInput = {
      UserPoolId: cognitoUserPoolId,
      ClientId: cognitoClientId,
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: this.calculateSecretHash(email),
      },
    };

    try {
      const command = new AdminInitiateAuthCommand(params);
      const response = await this.cognitoClient.send(command);

      return response;
    } catch (error) {
      console.error(error);
    }
  }
  async confirmUserSignup(email: string) {
    const params: AdminConfirmSignUpCommandInput = {
      UserPoolId: cognitoUserPoolId,
      Username: email,
    };

    try {
      const command = new AdminConfirmSignUpCommand(params);
      const response = await this.cognitoClient.send(command);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  private calculateSecretHash(username: string) {
    const hasher = createHmac('SHA256', cognitoClientSecret);
    hasher.update(username + cognitoClientId);
    return hasher.digest('base64');
  }
}
