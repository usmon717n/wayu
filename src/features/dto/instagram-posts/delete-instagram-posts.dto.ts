import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteInstagramPostsDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
