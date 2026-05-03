import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {IsString, MaxLength} from 'class-validator';
import {SocialLinkDto} from '@/features/content/social-links/social-link.dto';

export class CreateSocialLinksCommand extends Command<SocialLinkDto> {
  @IsString() @MaxLength(64) @ApiProperty() title!: string;
  @IsString() @MaxLength(128) @ApiProperty() icon!: string;
  @IsString() @MaxLength(128) @ApiProperty() link!: string;
}
