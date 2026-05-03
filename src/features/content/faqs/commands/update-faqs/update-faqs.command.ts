import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {IsOptional, IsString, MaxLength} from 'class-validator';
import {FaqDto} from '@/features/content/faqs/faq.dto';

export class UpdateFaqsCommand extends Command<FaqDto> {
  id!: number;
  @IsOptional() @IsString() @MaxLength(256) @ApiProperty({required: false}) question?: string;
  @IsOptional() @IsString() @MaxLength(512) @ApiProperty({required: false}) answer?: string;
}
