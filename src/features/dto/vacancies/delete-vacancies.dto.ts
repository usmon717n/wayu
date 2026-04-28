import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteVacanciesDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
