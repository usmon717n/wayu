import {ApiProperty} from '@nestjs/swagger';
import {IsString, MaxLength} from 'class-validator';

export class CreateSocialLinksDto {
  @ApiProperty() @IsString() @MaxLength(64) title!: string;
  @ApiProperty() @IsString() @MaxLength(128) icon!: string;
  @ApiProperty() @IsString() @MaxLength(128) link!: string;
}
