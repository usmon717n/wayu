import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteFaqsTagsDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
