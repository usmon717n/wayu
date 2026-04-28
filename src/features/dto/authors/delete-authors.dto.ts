import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteAuthorsDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
