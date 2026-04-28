import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DetailCountriesDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
