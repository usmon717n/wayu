import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DetailStaticInfoDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
