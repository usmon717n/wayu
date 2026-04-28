import {ApiProperty} from '@nestjs/swagger';
import {IsString, MaxLength} from 'class-validator';

export class CreateBookCategoriesDto {
  @ApiProperty() @IsString() @MaxLength(64) title!: string;
}
