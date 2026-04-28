import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteNewsCategoriesDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
