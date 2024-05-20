import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto){
    console.log(createUserDto);
    return this.authService.signupUser(createUserDto);
  }
  @Post('login')
  async login(@Body() loginUserDto: { email: string; password: string }) {
    return this.authService.authenticateUser(loginUserDto.email, loginUserDto.password);
  }
}
