import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { BooksModule } from './books/books.module';
import { DatabaseModule } from './Database/database.module';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
// import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    RouterModule.register([
      {
        path: 'api',
        module: DatabaseModule,
        children: [
          {
            path: "auth",
            module: UsersModule
          },
          {
            path: "books",
            module: BooksModule,
          }
        ]
      }
    ]),
    DatabaseModule,
    UsersModule,
    BooksModule],
})
export class AppModule { }
