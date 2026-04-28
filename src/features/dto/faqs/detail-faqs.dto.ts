import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DetailFaqsDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
