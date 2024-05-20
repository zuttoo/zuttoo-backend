import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
  AdminInitiateAuthCommandInput,
  AdminCreateUserCommand,
  AdminCreateUserCommandInput,
  AdminConfirmSignUpCommandInput,
  AdminConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { createHmac, privateDecrypt } from 'crypto';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('config');
const { cognitoClientId, cognitoUserPoolId, cognitoClientSecret, cognitoRegion } = config.get('awsCognitoConfig');
const { accessKey, secretKey, region } = config.get('awsConfig');

@Injectable()
export class AuthService {
  private cognitoClient: CognitoIdentityProviderClient;
  

  constructor( 
    private usersService: UsersService,
    @InjectRepository(User) private userRepository:Repository<User>
  ) {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: cognitoRegion,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });
    
  }

  async signupUser(dto:CreateUserDto): Promise<{message:string; data:any}> {
   
    const params: AdminCreateUserCommandInput = {
      UserPoolId: cognitoUserPoolId,
      Username: dto.email,
      TemporaryPassword: dto.password,
      UserAttributes: [
        {
          Name: 'email',
          Value: dto.email,
        },
        {
          Name: 'email_verified',
          Value: 'true',
        },
        // {
        //   Name:'custom:contactNumber',
        //   Value:dto?.contactNumber,
        // },
        // {
        //   Name:'custom:clientId',
        //   Value:dto?.clientId
        // },
        // {
        //   Name:'custom:oemId',
        //   Value: dto?.oemId
        // }, 
        // {
        //   Name:'custom:supplierId',
        //   Value:dto?.supplierId
        // },
        // {
        //   Name:'custom:role',
        //   Value:dto.role
        // },
        {
          Name:'name',
          Value:dto.name
        }
      ],
      MessageAction: 'SUPPRESS',
      ClientMetadata: {
        SECRET_HASH: this.calculateSecretHash(dto.email),
      },
    };

    try {
      const command = new AdminCreateUserCommand(params);
      const response = await this.cognitoClient.send(command);
      console.log(response);
      await this.confirmUserSignup(dto.email);
      const newUser=await this.usersService.createUser(dto);
      return {
        message: 'User created successfully.',
        data: newUser,
      };
    } catch (error) {
      throw new BadRequestException('Could not signup new user');
    }
  }

  async authenticateUser(email: string, password: string):Promise<{message:string; data:any}> {
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
      console.log(response);
      return {
        message:"Login Sucessful",
        data:response
      }
    } catch (error) {
      throw new BadRequestException("Login not successful");
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
