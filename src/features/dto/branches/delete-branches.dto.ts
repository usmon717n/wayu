import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteBranchesDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
