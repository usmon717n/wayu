import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {Type} from 'class-transformer';
import {IsInt, Min} from 'class-validator';
import {FaqsTagDto} from '@/features/content/faqs-tags/faqs-tag.dto';

export class CreateFaqsTagsCommand extends Command<FaqsTagDto> {
  @IsInt() @Min(1) @Type(() => Number) @ApiProperty() faqsId!: number;
  @IsInt() @Min(1) @Type(() => Number) @ApiProperty() tagId!: number;
}
