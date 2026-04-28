import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteLanguagesDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
