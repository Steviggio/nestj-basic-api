import { Injectable, Inject } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Model } from 'mongoose';
import Book, { BookDocument, BookRating } from './interfaces/books.interface';

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

  async setBookRate(userId: string, id: string, grade: number): Promise<BookDocument | null> {
    const existingBook = await this.bookModel.findById(id).exec();
    const currentUserID = userId;
  
    if (!existingBook) {
      return null;
    }
  
    // Vérifie si l'utilisateur a déjà noté ce livre
    const userExistingRatingIndex = existingBook.ratings.findIndex(rating => rating.userId === currentUserID);
  
    if (userExistingRatingIndex !== -1) {
      // Si l'utilisateur a déjà noté ce livre, met à jour sa note
      existingBook.ratings[userExistingRatingIndex].grade = grade;
    } else {
      // Si l'utilisateur n'a pas encore noté ce livre, ajoute une nouvelle note
      existingBook.ratings.push({ userId: currentUserID, grade: grade } as BookRating);
    }
  
    // Recalcul de la moyenne des notes
    const totalRatings = existingBook.ratings.length;
    let totalRatingSum = 0;
  
    existingBook.ratings.forEach(rating => {
      totalRatingSum += rating.grade;
    });
  
    existingBook.averageRating = totalRatings > 0 ? totalRatingSum / totalRatings : 0;
  
    // Enregistre les modifications
    return existingBook.save();
  }
  
  

}
