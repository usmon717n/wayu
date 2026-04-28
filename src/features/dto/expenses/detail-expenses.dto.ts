import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DetailExpensesDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
