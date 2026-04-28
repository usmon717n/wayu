import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteEventsDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
