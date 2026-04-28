import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DetailNewsTagsDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
