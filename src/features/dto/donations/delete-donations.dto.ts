import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class DeleteDonationsDto {
  @ApiProperty()
  @IsInt()
  id!: number;
}
