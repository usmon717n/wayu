import {ApiProperty} from '@nestjs/swagger';
import {IsInt, IsOptional, Min} from 'class-validator';
import {Type} from 'class-transformer';

export class GetAllStaticInfoFilters {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({required: false})
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({required: false})
  size?: number;
}
