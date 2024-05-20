import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string; //stored in userpool

  @IsEmail()
  @IsOptional()
  email: string; //stored in user pool

  @IsUUID()
  @IsOptional()
  clientId: string;

  @IsString()
  @IsOptional()
  supplierId: string;

  @IsString()
  @IsOptional()
  oemId:string;

  @IsString()
  @IsOptional()
  contactNumber: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsOptional()
  @IsEnum(['USER', 'MANAGER', 'ADMIN', 'SUPERADMIN'])
  role: string;
}
