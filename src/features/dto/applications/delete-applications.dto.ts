import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteApplicationsDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
