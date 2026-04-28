import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DetailUsefulLinksDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
