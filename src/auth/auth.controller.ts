import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: { email: string; password: string }): Promise<void> {
    await this.authService.createUser(createUserDto.email, createUserDto.password);
  }
  @Post('login')
  async login(@Body() loginUserDto: { email: string; password: string }) {
    return this.authService.authenticateUser(loginUserDto.email, loginUserDto.password);
  }
}
