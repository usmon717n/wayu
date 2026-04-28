import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteBookCategoriesDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
