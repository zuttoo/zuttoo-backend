import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  contactNumber: string;

  @IsOptional()
  @IsEnum(['USER', 'MANAGER', 'ADMIN', 'SUPERADMIN'])
  role: string;
}
