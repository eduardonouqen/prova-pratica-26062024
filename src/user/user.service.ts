import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private readonly users = [
    {
      userId: 1,
      name: 'john',
      surname: 'santos',
      email: 'john-santos@gmail.com',
      password: 'changeme',
    },
    {
      userId: 2,
      name: 'maria',
      surname: 'braga',
      email: 'maria-braga@gmail.com',
      password: 'guess',
    },
  ];

  async findOne(userId: number): Promise<User | undefined> {
    try {
      return this.users.find(user => user.userId === userId);
    } catch (error) {
      console.error(error);
    }
  }
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
      createUserDto.password = hash; 
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    } catch (error) {
      console.error(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (error) {
      console.error(error);
    }
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
      return existingUser;
    } catch (error) {
      console.error(error);
    }
}

  async delete(userId: number): Promise<User> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      console.error(error);
    }
}
}
