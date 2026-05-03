import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {IsOptional, IsString, MaxLength} from 'class-validator';
import {SocialLinkDto} from '@/features/content/social-links/social-link.dto';

export class UpdateSocialLinksCommand extends Command<SocialLinkDto> {
  id!: number;
  @IsOptional() @IsString() @MaxLength(64) @ApiProperty({required: false}) title?: string;
  @IsOptional() @IsString() @MaxLength(128) @ApiProperty({required: false}) icon?: string;
  @IsOptional() @IsString() @MaxLength(128) @ApiProperty({required: false}) link?: string;
}
