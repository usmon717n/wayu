import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteBooksDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
