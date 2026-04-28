import {ApiProperty} from '@nestjs/swagger';
import {IsString, MaxLength} from 'class-validator';

export class CreateFaqsDto {
  @ApiProperty() @IsString() @MaxLength(256) question!: string;
  @ApiProperty() @IsString() @MaxLength(512) answer!: string;
}
