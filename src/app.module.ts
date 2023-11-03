import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './Users/users.module';
import { DatasModule } from './datas/datas.module';
import { DatabaseModule } from './Database/database.module';

@Module({
  imports: [DatabaseModule, DatasModule, UsersModule],
})
export class AppModule { }
