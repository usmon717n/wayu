import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {Type} from 'class-transformer';
import {IsInt, Min} from 'class-validator';

export class DeleteFaqsTagsCommand extends Command<void> {
  @IsInt() @Min(1) @Type(() => Number) @ApiProperty() faqsId!: number;
  @IsInt() @Min(1) @Type(() => Number) @ApiProperty() tagId!: number;
}
