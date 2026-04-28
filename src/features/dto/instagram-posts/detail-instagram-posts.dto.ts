import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DetailInstagramPostsDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
