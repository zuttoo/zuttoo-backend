import { Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminInitiateAuthCommand,
  AdminRespondToAuthChallengeCommand,
  AdminSetUserPasswordCommand,
  AdminConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { CognitoIdentityProviderClientId } from 'aws-sdk/clients/cognitoidentity';

const COGNITO_CLIENT_ID = '';
const COGNITO_USER_POOL_ID = '';

@Injectable()
export class AuthService {
  private cognitoClient: CognitoIdentityProviderClient;

  constructor() {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: '',
    });
  }

  async createUser(email: string, phone: string, name: string): Promise<void> {
    const signupCommand = new AdminCreateUserCommand({
      UserPoolId: COGNITO_USER_POOL_ID,
      Username: email,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'phone_number', Value: phone },
        { Name: 'name', Value: name },
      ],
      MessageAction: 'SUPPRESS',
    });

    await this.cognitoClient.send(signupCommand);

    // confirm the user signup automatically
    const confirmCommand = new AdminConfirmSignUpCommand({
      UserPoolId: COGNITO_USER_POOL_ID,
      Username: email,
    });

    await this.cognitoClient.send(confirmCommand);
  }
}
