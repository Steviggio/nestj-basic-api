import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { BooksModule } from './books/books.module';
import { DatabaseModule } from './Database/database.module';
import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    BooksModule],
})
export class AppModule { }
