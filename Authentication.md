# NestJs Authentication set up : 

First install required packages : 

```shell 
npm i bcrypt @nestjs/jwt
npm i -D @types/bcrypt
```

In this project, middlewares are used to allow the authentication of a user. 

To initialize a basic group set for your users CRUD, you can use this command : 

```shell
nest g resource users
```

## Configure your .env file in your app :

In this example, a .env file is used to store my secret_token. To load it in my app, i used the ConfigModule from "@nestjs/config", and it looks like this in my app module :

``` ts
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    })]
})

```

## 

## Users controllers and services :

First step is to define the users services : 

```ts
import { Injectable, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./interfaces/user.interface";

@Injectable()
export class UsersService {
  constructor(@Inject("USER_MODEL") private readonly userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec()
  }

}
```

