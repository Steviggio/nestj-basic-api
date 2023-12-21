import { Injectable, Inject } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Model } from 'mongoose';
import { BookDocument, BookRating } from './interfaces/books.interface';

@Injectable()
export class BooksService {
  constructor(@Inject("Book") private readonly bookModel: Model<BookDocument>) { }

  async create(createBookDto: CreateBookDto): Promise<BookDocument> {
    const book = new this.bookModel({
      ...createBookDto,
      userId: createBookDto.userId
    }
    );
    return book.save();
  }

  async findAll(): Promise<BookDocument[]> {
    return this.bookModel.find().exec();
  }

  async findAllByUserId(userId: string): Promise<BookDocument[]> {
    return this.bookModel.find({ userId }).exec();
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<BookDocument | null> {
    const existingBook = await this.bookModel.findById(id).exec();

    if (!existingBook) {
      return null;
    }

    Object.assign(existingBook, updateBookDto);

    return existingBook.save();
  }

  
}
