import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { BooksModule } from './books/books.module';
// import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, BooksModule],
})
export class AppModule { }
