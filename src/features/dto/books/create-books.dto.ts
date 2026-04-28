import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsInt, IsOptional, IsString, MaxLength} from 'class-validator';

export class CreateBooksDto {
  @ApiProperty() @IsInt() authorId!: number;
  @ApiProperty() @IsInt() categoryId!: number;
  @ApiProperty() @IsString() @MaxLength(256) title!: string;
  @ApiProperty() @IsString() @MaxLength(128) image!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiProperty() @IsString() @MaxLength(256) file!: string;
  @ApiProperty() @IsInt() pages!: number;
  @ApiProperty() @IsInt() year!: number;
}
