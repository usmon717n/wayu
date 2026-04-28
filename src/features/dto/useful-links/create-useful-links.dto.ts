import {ApiProperty} from '@nestjs/swagger';
import {IsString, MaxLength} from 'class-validator';

export class CreateUsefulLinksDto {
  @ApiProperty() @IsString() @MaxLength(128) title!: string;
  @ApiProperty() @IsString() @MaxLength(128) icon!: string;
  @ApiProperty() @IsString() @MaxLength(128) link!: string;
}
