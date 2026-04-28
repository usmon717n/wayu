import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DetailBooksDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
