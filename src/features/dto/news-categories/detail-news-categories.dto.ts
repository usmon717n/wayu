import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DetailNewsCategoriesDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
