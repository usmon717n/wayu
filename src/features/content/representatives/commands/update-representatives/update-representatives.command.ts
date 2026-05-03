import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {IsEmail, IsOptional, IsString, MaxLength} from 'class-validator';
import {RepresentativeDto} from '@/features/content/representatives/representative.dto';
export class UpdateRepresentativesCommand extends Command<RepresentativeDto> {
  id!: number;
  @IsOptional() @IsString() @MaxLength(64) @ApiProperty({required: false}) fullName?: string;
  @IsOptional() @IsString() @MaxLength(128) @ApiProperty({required: false}) image?: string;
  @IsOptional() @IsEmail() @MaxLength(64) @ApiProperty({required: false}) email?: string;
  @IsOptional() @IsString() @MaxLength(16) @ApiProperty({required: false}) phoneNumber?: string;
  @IsOptional() @IsString() @ApiProperty({required: false}) resume?: string;
}
