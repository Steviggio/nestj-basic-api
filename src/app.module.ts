import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './Users/users.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/Steviggio_db'), UsersModule],
})
export class AppModule { }
