import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService){}
    
    async canActivate(context:ExecutionContext):Promise<boolean>{
        const request=context.switchToHttp().getRequest();
        const authHeader=request.headers.authorization;
        
        if(!authHeader){
            throw new UnauthorizedException('No authorization header provided');
        }

        const [bearer, token]=authHeader.split(' ');
        if(bearer !=='Bearer' || !token){
            throw new UnauthorizedException('Invalid authorization header format');

        }
        try{
            const payload=await this.authService.verifyJwt(token, 'ACCESS');
            request['user']=payload;
            return true;
        }catch(error){
            throw new UnauthorizedException('Invalid Exception');
        }
    }
}