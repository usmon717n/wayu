import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {IsString, MaxLength} from 'class-validator';
import {FaqDto} from '@/features/content/faqs/faq.dto';

export class CreateFaqsCommand extends Command<FaqDto> {
  @IsString() @MaxLength(256) @ApiProperty() question!: string;
  @IsString() @MaxLength(512) @ApiProperty() answer!: string;
}
