import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { bookProviders } from './books.providers';
import { DatabaseModule } from 'src/Database/database.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [BooksService, ...bookProviders],
})
export class BooksModule { }
