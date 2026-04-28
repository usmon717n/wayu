import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DetailApplicationsDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
