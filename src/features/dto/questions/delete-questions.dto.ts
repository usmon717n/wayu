import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteQuestionsDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
