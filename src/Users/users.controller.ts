import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./interfaces/user.interface";
import { Param } from "@nestjs/common";

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('find')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get("find/:id")
  async findOne(@Param("id") id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    return user
  }

  @Post('login') // Adjust the route according to your application
  async login(@Body() { email, password }: { email: string; password: string }) {
    // Auth middleware would have verified the user and password
    // If control reaches here, login is successful, return token or user details
    // Generate token or return user details
    return { token: process.env.TOKEN_SECRET };
  }
}