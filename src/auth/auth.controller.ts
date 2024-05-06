import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: { email: string; phone: string; name: string }): Promise<void> {
    return this.authService.createUser(createUserDto.email, createUserDto.phone, createUserDto.name);
  }
}
