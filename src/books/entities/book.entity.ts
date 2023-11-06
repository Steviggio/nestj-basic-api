export class Book {
  userId: string;
  title: string;
  author: string;
  imageUrl: string;
  year: number;
  genre: string;
  ratings: { grade: number }[];


  constructor(title: string, author: string, imageUrl: string, year: number, genre: string, ratings: []) {
    this.title = title;
    this.author = author;
    this.imageUrl = imageUrl;
    this.year = year;
    this.genre = genre;
    this.ratings = ratings;
  }

}
