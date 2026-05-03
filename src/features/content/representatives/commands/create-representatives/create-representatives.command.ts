import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {IsEmail, IsString, MaxLength} from 'class-validator';
import {RepresentativeDto} from '@/features/content/representatives/representative.dto';

export class CreateRepresentativesCommand extends Command<RepresentativeDto> {
  @IsString() @MaxLength(64) @ApiProperty() fullName!: string;
  @IsString() @MaxLength(128) @ApiProperty() image!: string;
  @IsEmail() @MaxLength(64) @ApiProperty() email!: string;
  @IsString() @MaxLength(16) @ApiProperty() phoneNumber!: string;
  @IsString() @ApiProperty() resume!: string;
}
