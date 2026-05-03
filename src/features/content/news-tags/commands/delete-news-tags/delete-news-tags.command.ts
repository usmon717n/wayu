import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {Type} from 'class-transformer';
import {IsInt, Min} from 'class-validator';

export class DeleteNewsTagsCommand extends Command<void> {
  @IsInt() @Min(1) @Type(() => Number) @ApiProperty() newsId!: number;
  @IsInt() @Min(1) @Type(() => Number) @ApiProperty() tagId!: number;
}
