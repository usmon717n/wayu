import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {Allow, IsEmail, IsString, MaxLength} from 'class-validator';
import {RepresentativeDto} from '@/features/content/representatives/representative.dto';

export class CreateRepresentativesCommand extends Command<RepresentativeDto> {
  @IsString() @MaxLength(64) @ApiProperty() fullName!: string;
  @ApiProperty({type: 'string', format: 'binary'}) @Allow() image!: string;
  @IsEmail() @MaxLength(64) @ApiProperty() email!: string;
  @IsString() @MaxLength(16) @ApiProperty() phoneNumber!: string;
  @IsString() @ApiProperty() resume!: string;
}
