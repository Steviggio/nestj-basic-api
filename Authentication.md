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

## Connect to the MongoDB database : 

To connect to the database, we configure a Database provider like in the following example : 

```ts 
import * as mongoose from "mongoose";

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://127.0.0.1:27017/Steviggio_db')
  }
]
```

And we export the Database module and import it inside the App module : 

```ts 
import { Module } from "@nestjs/common";
import { databaseProviders } from "./database.providers";

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})

export class DatabaseModule { }
```

---

We need to import the DB(database) module inside the different modules in which we need to configure a specific mongoose schema.
The schemas are set in providers files, looking like this :

```ts
import { Mongoose } from "mongoose";
import { BooksSchema } from "./schemas/books.schema";

export const bookProviders = [
  {
    provide: 'Book',
    useFactory: (mongoose: Mongoose) => mongoose.model("Book", BooksSchema),
    inject: ['DATABASE_CONNECTION'],
  }
]
```


## Users controllers and services :

For users, we need to create services. Services contain the data operations logic. It will look like this : 

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

