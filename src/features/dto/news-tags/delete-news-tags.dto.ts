import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteNewsTagsDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
