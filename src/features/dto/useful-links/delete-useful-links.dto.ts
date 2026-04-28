import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteUsefulLinksDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
