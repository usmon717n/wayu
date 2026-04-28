import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DetailVacanciesDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
