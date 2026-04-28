import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteSocialLinksDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
