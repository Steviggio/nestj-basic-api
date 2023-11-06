import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  title?: string;
  author?: string;
  imageUrl?: string;
  year?: number;
  genre?: string;
  ratings?: { userId: string, grade: number }[];
  averageRating?: number;
}
