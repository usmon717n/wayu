import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteEventCategoriesDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
