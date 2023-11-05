import { Mongoose } from "mongoose";
import { BooksSchema } from "./schemas/books.schema";

export const bookProviders = [
  {
    provide: 'BOOK_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model("Book", BooksSchema),
    inject: ['DATABASE_CONNECTION'],
  }
]