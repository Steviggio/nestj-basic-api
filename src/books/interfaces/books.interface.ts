import mongoose, { Document, Schema } from "mongoose";


export interface BookRating extends Document {
  userId?: string;
  grade?: number;
}

export interface BookDocument extends Document {
  userId: string;
  title: string;
  author: string;
  imageUrl: string;
  year: number | string;
  genre: string;
  ratings: BookRating[];
  averageRating: number;
}

export const BOOKS_REQUIRED_STRING_INPUT_FIELDS: (keyof BookDocument)[] = ["title", "genre", "author"];
export const BOOKS_OPTIONAL_STRING_INPUT_FIELDS: (keyof BookDocument)[] = [];

const BOOK_MIN_RATE = 0;
const BOOK_MAX_RATE = 5;
const bookRateMongooseSpecs = { type: Number, required: true, min: BOOK_MIN_RATE, max: BOOK_MAX_RATE };

const ratingSchema = new mongoose.Schema({
  userId: { type: String },
  grade: bookRateMongooseSpecs
})

type NaiveSchemaRuleset = Record<string, unknown>;

const bookSchemaRuleset: NaiveSchemaRuleset = {
  ratings: { type: [ratingSchema], required: true },
  averageRating: bookRateMongooseSpecs,
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true }
};

const bookSchema: Schema<BookDocument> = new mongoose.Schema(bookSchemaRuleset);
bookSchema.index({ averageRating: -1 });

export default mongoose.model<BookDocument>('Book', bookSchema);