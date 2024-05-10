import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.createUser(createUserDto);
  }
  @Patch('/:id')
  updateUser(@Param('id') id, @Body()dto:UpdateUserDto){
    return this.usersService.updateUser(id, dto);
  }

  @Delete('/:id')
  softDelete(@Param('id') id:string){
    console.log(id);
    return this.usersService.softDeleteUser(id);
  }
}
