import { Injectable, Inject } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Model } from 'mongoose';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(@Inject("BOOK_MODEL") private readonly bookModel: Model<Book>) { }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = new this.bookModel({
      ...createBookDto,
      userId: createBookDto.userId
    }
    );
    return book.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findAllByUserId(userId: string): Promise<Book[]> {
    return this.bookModel.find({ userId }).exec();
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book | null> {
    const existingBook = await this.bookModel.findById(id).exec();

    if (!existingBook) {
      return null;
    }

    Object.assign(existingBook, updateBookDto);

    return existingBook.save();
  }
}
