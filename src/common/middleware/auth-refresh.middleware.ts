import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
// import { AdminInitiateAuthCommand, AdminInitiateAuthCommandInput, AdminAddUserToGroupCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { AuthService } from '../../auth/auth.service';


@Injectable()
export class AuthRefreshMiddleware implements NestMiddleware{

    constructor(
        private authService: AuthService,
    ){}
    private getRefreshTokenFromRequest(req:Request): string | null{
        const authHeader=req.headers.authorization;

        if(!authHeader){
            return null;
        }
        const token=authHeader.split(' ')[1];
        const decodedToken=jwt.decode(token, {complete:true});

        if(!decodedToken || !decodedToken.payload){
            return null;
        }
        const refreshToken=decodedToken.payload['refreshToken'];
        return refreshToken || null;

    }

    private getIdTokenFromRequest(req:Request): string | null{
        const authHeader=req.headers.authorization;

        if(!authHeader){
            return null;
        }
        const token=authHeader.split(' ')[1];
        const decodedToken=jwt.decode(token, {complete:true});

        if(!decodedToken || !decodedToken.payload){
            return null;
        }
        const refreshToken=decodedToken.payload['IdToken'];
        return refreshToken || null;

    }


    private setRefreshTokenInRequest(req: Request, refreshToken: string): void {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return;
        }
       
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.decode(token, { complete: true });
       
        if (!decodedToken || !decodedToken.payload) {
          return;
        }
       
        const payload=decodedToken.payload
        const newToken = {
          payload,
          refreshToken,
        };
       
        const signedToken = jwt.sign(newToken, 'your-secret-key', { algorithm: 'HS256' });
        req.headers.authorization = `Bearer ${signedToken}`;
       }
    
      

      async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        const refreshToken = this.getRefreshTokenFromRequest(req);
        const idToken=this.getIdTokenFromRequest(req);
     
        if (!authHeader || !refreshToken) {
          return next();
        }
     
        const accessToken = authHeader.split(' ')[1];
        const decodedToken = jwt.decode(accessToken, { complete: true });
     
        // if (!decodedToken || !this.isTokenExpiring(decodedToken.payload.exp)) {
        //     return next();
        //   }
     
        try {
          const newTokens = await this.authService.refreshAccessToken(refreshToken, idToken);
          req.headers.authorization = `Bearer ${newTokens.accessToken}`;
          this.setRefreshTokenInRequest(req, newTokens.refreshToken);
        } catch (error) {
          console.error('Failed to refresh access token:', error);
        } finally {
          next();
        }
      }
}