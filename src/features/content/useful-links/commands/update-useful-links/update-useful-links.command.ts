import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {IsOptional, IsString, MaxLength} from 'class-validator';
import {UsefulLinkDto} from '@/features/content/useful-links/useful-link.dto';
export class UpdateUsefulLinksCommand extends Command<UsefulLinkDto> {
  id!: number;
  @IsOptional() @IsString() @MaxLength(128) @ApiProperty({required: false}) title?: string;
  @IsOptional() @IsString() @MaxLength(128) @ApiProperty({required: false}) icon?: string;
  @IsOptional() @IsString() @MaxLength(128) @ApiProperty({required: false}) link?: string;
}
