import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsInt, IsOptional, Min} from 'class-validator';

export class GetAllCountriesFilters {
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false})
  page?: number;

  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false})
  size?: number;
}
