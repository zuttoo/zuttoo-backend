import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {validate, isValidUUID} from 'uuid';
import { identity } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: [
        {
          email: createUserDto.email,
          name: createUserDto.name,
        },
      ],
    });
    if (existingUser) {
      throw new ConflictException('User is already registered');
    }
    const user: User = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.contactNumber = createUserDto.contactNumber;
    user.role = createUserDto.role;
    user.client=createUserDto.clientId;
    
    return this.userRepository.save(user);
  }

  async updateUser(userId:string,updateUserDto: UpdateUserDto): Promise<{message:string; data:Partial<User>}>{
    const { name, email, clientId, supplierId, oemId, contactNumber, password, role}=updateUserDto;
    const existingUser=await this.userRepository.findBy({
      id:userId,
    })

    if(!existingUser){
      throw new NotFoundException("User does not exist");
    }

    const updatedUser: User=await this.userRepository.save({
      id:userId,
      name:name,
      email:email,
      clientId:clientId,
      supplierId:supplierId,
      oemId:oemId,
      contactNumber:contactNumber,
      password:password,
      role:role
    });

    return {
      message:"User Successfully Updated",
      data: updatedUser
    }

  };

  async getUser(userId:string): Promise<{message:string; data:User}>{
    if(!isValidUUID(userId)){
      throw new BadRequestException('Invalid User Id');
    }
    const user=await this.userRepository.findOne({
      where:{
        id:userId
      }
    });

    if(!user){
      throw new NotFoundException('User not found.');
    }

    return{
      message:'Successfully returned users',
      data:user
    }

    
  }

  async softDeleteUser(userId:string): Promise<{message:string; data:any}>{
    if(!validate(userId)){
      throw new BadRequestException('Invalid User Id');
    }
    const user=await this.userRepository.findOne({
      where:{
        id:userId
      }
    });
    if(!user){
      throw new NotFoundException('User does not exist');
    }

    // const deletedUser=await this.userRepository.createQueryBuilder().softDelete().where("id= :id", {id:userId}).execute();
   const deletedUser= await this.userRepository.softDelete({
      id:userId  
    })
    return{
      message:"User deleted successfully",
      data: deletedUser
    
    }
   
  }
}
