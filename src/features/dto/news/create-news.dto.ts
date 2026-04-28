import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsDateString, IsInt, IsOptional, IsString, MaxLength} from 'class-validator';

export class CreateNewsDto {
  @ApiProperty() @IsInt() categoryId!: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() countryId?: number;
  @ApiProperty() @IsString() @MaxLength(256) title!: string;
  @ApiProperty() @IsString() @MaxLength(128) image!: string;
  @ApiProperty({example: '2026-04-28'}) @IsDateString() date!: string;
  @ApiProperty() @IsString() content!: string;
}
