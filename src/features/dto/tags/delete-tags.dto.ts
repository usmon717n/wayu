import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteTagsDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
