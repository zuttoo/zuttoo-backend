import { Controller, Post, Body, UsePipes, ValidationPipe,Headers, Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({whitelist:true}))
  async signup(@Body() createUserDto: CreateUserDto){
    console.log(createUserDto);
    return this.authService.signupUser(createUserDto);
  }
  @Post('login')
  async login(@Body() loginUserDto: { email: string; password: string }) {
    return this.authService.authenticateUser(loginUserDto.email, loginUserDto.password);
  }

  @Post('change-password')
  @UsePipes(new ValidationPipe({whitelist:true}))
  async changePassword(@Body() changePasswordDto: {email:string, currentPassword:string,newPassword:string}){
    console.log(changePasswordDto);
    return this.authService.changePassword(changePasswordDto.email, changePasswordDto.currentPassword, changePasswordDto.newPassword);
  }

  @Post('forgot-password')
  @UsePipes(new ValidationPipe({whitelist:true}))
  async forgotPassword(@Body('email') email:string):Promise<{message: string}>{
    return this.authService.forgotPassword(email);
  }

  @Post('confirm-reset-code')
  @UsePipes(new ValidationPipe({whitelist:true}))
  async confirmResetCode(
    @Body() confirmCodeDto:{email:string, code:string, newPassword:string}
  ){
    return this.authService.confirmPasswordResetCode(confirmCodeDto.email, confirmCodeDto.code, confirmCodeDto.newPassword);
  }

  @Post('verify-jwt')
  async verifyJwt(@Body('token') token:string , @Body('intent') intent:string){
    return await this.authService.verifyJwt(token,intent);
  }

  @Post('refresh-access-token')
  async refreshAccessToken(
    @Body('refreshToken') refreshToken:string,
    @Body('accessToken') accessToken:string
  ){
    return await this.authService.refreshAccessToken(refreshToken,accessToken);
  }
  @Post('logout')
  async logout(@Headers('refresh-token') refreshToken: string,
                @Req() req:Request) {
    console.log(req.headers);
    return this.authService.logout(refreshToken);
  }
}
