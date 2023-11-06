import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    const newBook = await this.booksService.create(createBookDto);
    return newBook;
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(":userId")
  async findAllByUserId(@Param("userId") userId: string) {
    const userBooks = await this.booksService.findAllByUserId(userId);
    return userBooks;
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
    const updatedBook = await this.booksService.update(id, updateBookDto);
    return updatedBook
  }
}
