import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DetailEventCategoriesDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
