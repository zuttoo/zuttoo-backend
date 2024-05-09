import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // check if existing user already exists in the database
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

    // create a new user object
    const user: User = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.contactNumber = createUserDto.contactNumber;
    user.role = createUserDto.role;
    // save the user to the database
    return this.userRepository.save(user);
  }

  // async updateUser(createUserDto: CreateUserDto): Promise<User>{
    
  // };
}
