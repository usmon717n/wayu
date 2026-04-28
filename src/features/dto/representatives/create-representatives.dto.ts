import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString, MaxLength} from 'class-validator';

export class CreateRepresentativesDto {
  @ApiProperty() @IsString() @MaxLength(64) fullName!: string;
  @ApiProperty() @IsString() @MaxLength(128) image!: string;
  @ApiProperty() @IsEmail() @MaxLength(64) email!: string;
  @ApiProperty() @IsString() @MaxLength(16) phoneNumber!: string;
  @ApiProperty() @IsString() resume!: string;
}
