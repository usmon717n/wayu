import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DetailRepresentativesDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
