import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
  AdminInitiateAuthCommandInput,
  AdminCreateUserCommand,
  AdminCreateUserCommandInput,
  AdminConfirmSignUpCommandInput,
  AdminConfirmSignUpCommand,
  AdminUpdateUserAttributesCommandInput,
  AdminUpdateUserAttributesCommand,
  AdminRespondToAuthChallengeCommandInput,
  AdminRespondToAuthChallengeCommand,
  AdminRespondToAuthChallengeCommandOutput,
  ForgotPasswordCommandInput,
  ForgotPasswordCommand,
  ForgotPasswordCommandOutput,
  ConfirmForgotPasswordCommandInput,
  ConfirmForgotPasswordCommand,
  ConfirmForgotPasswordCommandOutput,
  AdminInitiateAuthCommandOutput,
  RevokeTokenCommandInput,
  RevokeTokenCommand
} from '@aws-sdk/client-cognito-identity-provider';
import { AuthGuard } from '@nestjs/passport'
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { createHmac, privateDecrypt } from 'crypto';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
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
      // extract user id from the response
      const userId=response.User.Username;

      // const customAttributes={
      //   'custom:contactNumber': dto.contactNumber,
      //   'custom:clientId':dto.clientId,
      //   'custom:oemId':dto.oemId,
      //   'custom:supplierId':dto.supplierId,
      //   'custom:role':dto.role,
      // };
      // update the custome user attributes

      // await this.updateUserAttributes(userId, customAttributes);

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

  async changePassword(email:string, currentPassword:string, newPassword: string):Promise<{message:string;accessToken:string;idToken:string; refreshToken:string} | void>{
    const params:AdminRespondToAuthChallengeCommandInput={
      UserPoolId:cognitoUserPoolId,
      ClientId:cognitoClientId,
      ChallengeResponses:{
        'NEW_PASSWORD': newPassword,
        'USERNAME': email,
        'SECRET_HASH': this.calculateSecretHash(email),
      },
      ChallengeName:'NEW_PASSWORD_REQUIRED',
    };

    // create a cognito session
    const session=await this.createCognitoSession(email, currentPassword || '');

    if(!session){
      throw new BadRequestException('Invalid Credentials');
    }

    params.Session=session;

    const command=new AdminRespondToAuthChallengeCommand(params);

    try{
      const response:AdminRespondToAuthChallengeCommandOutput=await this.cognitoClient.send(command);
      if(response.AuthenticationResult){
        return{
          message:"Successfully Changed Password",
          accessToken:response.AuthenticationResult.AccessToken || '',
          idToken:response.AuthenticationResult.IdToken || '',
          refreshToken:response.AuthenticationResult.RefreshToken || ''
        };
      }
    }catch(error){
      throw new BadRequestException('Failed To Change Password');
    }

  }
  private calculateSecretHash(username: string) {
    const hasher = createHmac('SHA256', cognitoClientSecret);
    hasher.update(username + cognitoClientId);
    return hasher.digest('base64');
  }

  async forgotPassword(email:string): Promise<{message:string;data:ForgotPasswordCommandOutput}>{
      const params: ForgotPasswordCommandInput={
        ClientId:cognitoClientId,
        Username:email,
        SecretHash: this.calculateSecretHash(email),
        ClientMetadata:{
          SECRET_HASH: this.calculateSecretHash(email),
        },

      };

      const command=new ForgotPasswordCommand(params);

      try{
        const response: ForgotPasswordCommandOutput=await this.cognitoClient.send(command);
        console.log('Forgot Password Response', response);
        return{
          message:'Forgot Password Code Sent Successfully',
          data:response
        };


      }catch(error){
        throw new BadRequestException('Failed To Send Forgot Password Code')
      }

  }

  async confirmPasswordResetCode(email:string,code:string,newPassword:string): Promise<{message:string;data:ConfirmForgotPasswordCommandOutput}>{
    const params: ConfirmForgotPasswordCommandInput={
      ClientId:cognitoClientId,
      Username:email,
      ConfirmationCode:code,
      Password:newPassword,
      SecretHash:this.calculateSecretHash(email),
      ClientMetadata:{
        SECRET_HASH: this.calculateSecretHash(email)
      },
    };
    const command=new ConfirmForgotPasswordCommand(params);
    try{
      const response:ConfirmForgotPasswordCommandOutput=await this.cognitoClient.send(command);
      return{
        message:'Password Reset Successful',
        data:response
      };
    }catch(error){
      throw new BadRequestException('Failed to confirm reset code');
    }
  }

  async refreshAccessToken(refreshToken:string, accessToken:string):Promise<{message:'Successfully generate access token'; accessToken:string; idToken:string; refreshToken:string}>{
    const decryptedPayload=await this.verifyJwt(accessToken,"ACCESS");
    const secretHash=this.calculateSecretHash(decryptedPayload.sub);
    const params:AdminInitiateAuthCommandInput={
      UserPoolId:cognitoUserPoolId,
      ClientId:cognitoClientId,
      AuthFlow:'REFRESH_TOKEN_AUTH',
      AuthParameters:{
        REFRESH_TOKEN: refreshToken,
        SECRET_HASH: secretHash,  
      },
    };
    const command=new AdminInitiateAuthCommand(params);

 
    try{
      const response=await this.cognitoClient.send(command);
      const {AuthenticationResult}=response;
      if(!AuthenticationResult){
        throw new Error('New Access Tokens and Id tokens could not be generated.')
      };

      return{
        message:'Successfully generate access token',
        accessToken:AuthenticationResult.AccessToken,
        idToken:AuthenticationResult.IdToken,
        refreshToken:AuthenticationResult.RefreshToken || refreshToken,
      }
    }catch(error){
      throw new BadRequestException('Failed to refresh access token');
    }
  }


  private async updateUserAttributes(userId:string, attributes: {[key:string]: string}):Promise <any>{
    const params:AdminUpdateUserAttributesCommandInput={
      UserPoolId:cognitoUserPoolId,
      Username:userId,
      UserAttributes: Object.entries(attributes).map(([name, value])=>({Name:name, Value:value})),

    };
    const command=new AdminUpdateUserAttributesCommand(params);
    try{
      const response=await this.cognitoClient.send(command);
      // console.log('User attribute updated successfully:', response);
      return response;

    }catch(error){
      throw new BadRequestException('Failed to update user attributes');
    }
  }
  private async createCognitoSession(email:string, password:string): Promise<string| null>{
    const params:AdminInitiateAuthCommandInput={
      AuthFlow:'ADMIN_USER_PASSWORD_AUTH',
      UserPoolId:cognitoUserPoolId,
      ClientId:cognitoClientId,
      AuthParameters:{
        USERNAME:email,
        PASSWORD: password,
        SECRET_HASH: this.calculateSecretHash(email),
      },
    };
    const command=new AdminInitiateAuthCommand(params);

    try{
      const response=await this.cognitoClient.send(command);
      return response.Session

    }catch(error){
      return null;
    } 

  }

  async logout(refreshToken:string):Promise<{message:string}>{
    try{
      // await this.verifyJwt(accessToken, 'ACCESS');

      const params:RevokeTokenCommandInput={
        Token:refreshToken,
        ClientId:cognitoClientId,
        ClientSecret:cognitoClientSecret,
      }
      const command=new RevokeTokenCommand(params);
      await this.cognitoClient.send(command);
      return {
        message:'Logout Successful'
      }

    }catch(error){
      throw new BadRequestException('Failed to Logout');
    }
  }

  async verifyJwt(jwtToken:string, intent:string):Promise<any>{

    let tokenUseIntent:any;
    if(intent==="ID"){
      tokenUseIntent='id'
    }else if(intent==="ACCESS"){
      tokenUseIntent='access'
    }
    const verifier=CognitoJwtVerifier.create({
      userPoolId:cognitoUserPoolId,
      tokenUse:tokenUseIntent,
      clientId:cognitoClientId
    });

    try{
      const payload=await verifier.verify(jwtToken);
      
      return payload
      
    }catch(error){
      console.log("Token not valid");
      throw new BadRequestException("Token Not Valid");
    }
  }
}
