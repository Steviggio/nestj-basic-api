export class CreateDataDto {
  readonly title: string;
  readonly author: string;
  readonly imageUrl: string;
  readonly year: number;
  readonly genre: string;
  readonly ratings: { readonly grade: string }[];


  constructor(title: string, author: string, imageUrl: string, year: number, genre: string, ratings: { readonly grade: string }[]) {
    this.title = title;
    this.author = author;
    this.imageUrl = imageUrl;
    this.year = year;
    this.genre = genre;
    this.ratings = ratings;
  }

  get averageRating(): number {
    if (this.ratings.length === 0) {
      return 0;
    }

    const total = this.ratings.reduce((acc, rating) => acc + parseInt(rating.grade), 0);
    return total / this.ratings.length;
  }

}
