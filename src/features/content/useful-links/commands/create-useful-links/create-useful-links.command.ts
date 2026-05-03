import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {IsString, MaxLength} from 'class-validator';
import {UsefulLinkDto} from '@/features/content/useful-links/useful-link.dto';

export class CreateUsefulLinksCommand extends Command<UsefulLinkDto> {
  @IsString() @MaxLength(128) @ApiProperty() title!: string;
  @IsString() @MaxLength(128) @ApiProperty() icon!: string;
  @IsString() @MaxLength(128) @ApiProperty() link!: string;
}
