import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DetailBranchesDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
