import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteNewsDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
