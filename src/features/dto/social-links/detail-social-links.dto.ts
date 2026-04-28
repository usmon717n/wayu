import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DetailSocialLinksDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
