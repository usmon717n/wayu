import {ApiProperty} from '@nestjs/swagger';
import {IsString, MaxLength} from 'class-validator';

export class CreateLanguagesDto {
  @ApiProperty() @IsString() @MaxLength(64) title!: string;
}
