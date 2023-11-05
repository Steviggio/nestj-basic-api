import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { BooksModule } from './books/books.module';


@Module({
  imports: [UsersModule, BooksModule],
})
export class AppModule { }
