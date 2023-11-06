import { Document } from "mongoose";

export interface Book extends Document {
  userId: string,
  title: string,
  author: string,
  imageUrl: string,
  year: number,
  genre: string,
  ratings: { grade: number }[]
}