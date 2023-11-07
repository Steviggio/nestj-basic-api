import { Controller, Get, Post, Body, Put, Param, NotFoundException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDocument } from './interfaces/books.interface'; // Assurez-vous de l'importer correctement

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<BookDocument> {
    const newBook = await this.booksService.create(createBookDto);
    return newBook;
  }

  @Post(":id/rate")
  async rate(@Param("id") id: string, @Body() { userId, grade }: { userId: string, grade: number }): Promise<BookDocument> {
    const updatedBook = await this.booksService.setBookRate(userId, id, grade);
    if (!updatedBook) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return updatedBook;
  }

  @Get()
  async findAll(): Promise<BookDocument[]> {
    return this.booksService.findAll();
  }

  @Get("user/:userId")
  async findAllByUserId(@Param("userId") userId: string): Promise<BookDocument[]> {
    const userBooks = await this.booksService.findAllByUserId(userId);
    return userBooks;
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto): Promise<BookDocument> {
    const updatedBook = await this.booksService.update(id, updateBookDto);
    if (!updatedBook) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return updatedBook;
  }
}
