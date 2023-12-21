import { Injectable, Inject, ConflictException } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./interfaces/user.interface";

@Injectable()
export class UsersService {
  constructor(@Inject("user") private readonly userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userModel(createUserDto);
      return await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException("Email already exists");
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec()
  }

}