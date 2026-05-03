import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {IsString, MaxLength} from 'class-validator';
import {TagDto} from '@/features/content/tags/tag.dto';
export class CreateTagsCommand extends Command<TagDto> {
  @IsString() @MaxLength(64) @ApiProperty() title!: string;
}
