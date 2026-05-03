import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {Type} from 'class-transformer';
import {IsInt, Min} from 'class-validator';
import {NewsTagDto} from '@/features/content/news-tags/news-tag.dto';
export class CreateNewsTagsCommand extends Command<NewsTagDto> {
  @IsInt() @Min(1) @Type(() => Number) @ApiProperty() newsId!: number;
  @IsInt() @Min(1) @Type(() => Number) @ApiProperty() tagId!: number;
}
