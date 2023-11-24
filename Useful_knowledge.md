# Useful knowledge of NestJs : 

In this doc, i will be listing useful tips / elements for a basic NestJs API.

## Initialize the NestJs app :

To initialize a NestJs application, you need to use the following command : 

```shell
nest new project_name
```

## Generate a basic CRUD structure : 

To easily generate the necessary resources for the CRUD structure, you need to use the following command : 

```shell
nest g resource resource_name
```

## Integrate a resource to your module :

When you've created a resource, you need to create an interface to build your data's structure. 

```ts
import { Document } from "mongoose";

export interface User extends Document {
  readonly email: string;
  readonly password: string;
  readonly role: string;
}
```

This interface will be used in your service file to design the data flow of your different requests, next to a CreateDTO file to check the data structure.


```ts
export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly role: string;
}
```

Here is your users.service.ts file 

```ts
import { Injectable, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./interfaces/user.interface";

@Injectable()
export class UsersService {
  constructor(@Inject("USER_MODEL") private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }
}
```

The next step is to set up the requests in your controller file. You'll need to configure and specify the behavior of your services with the database.

```ts
import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./interfaces/user.interface";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

In this project, the app is working with a MongoDB database and we use mongoose to configure the connection and create the user model.

users.schema.ts

```ts 
import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user", enum: ["user", "admin"] }
})
```

## Database connection : 

To connect the app to the database, we use the Database.providers.ts file, that contains the mongoose connection logic with the mongoDB database address. 

```ts
import * as mongoose from "mongoose";

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://server_adress')
  }
]
```

Then we use the these providers inside the Database module that will be exported to be used inside other module interacting with the database. 

```ts
import { Module } from "@nestjs/common";
import { databaseProviders } from "./database.providers";

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})

export class DatabaseModule { }
```

