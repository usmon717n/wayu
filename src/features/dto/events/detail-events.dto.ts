import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DetailEventsDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
