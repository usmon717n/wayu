import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteFaqsDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
