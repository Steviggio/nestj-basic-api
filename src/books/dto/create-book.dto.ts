export class CreateBookDto {
  readonly title: string;
  readonly author: string;
  readonly imageUrl: string;
  readonly year: number;
  readonly genre: string;
  readonly ratings: { grade: number }[];
}