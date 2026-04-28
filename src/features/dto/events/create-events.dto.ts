import {ApiProperty} from '@nestjs/swagger';
import {IsDateString, IsInt, IsString, MaxLength} from 'class-validator';

export class CreateEventsDto {
  @ApiProperty() @IsInt() categoryId!: number;
  @ApiProperty() @IsString() @MaxLength(256) title!: string;
  @ApiProperty() @IsString() content!: string;
  @ApiProperty() @IsString() @MaxLength(128) image!: string;
  @ApiProperty() @IsDateString() date!: string;
  @ApiProperty() @IsString() @MaxLength(128) address!: string;
}
