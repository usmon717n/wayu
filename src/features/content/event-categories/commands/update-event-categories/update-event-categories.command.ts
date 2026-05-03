import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {IsOptional, IsString, MaxLength} from 'class-validator';
import {EventCategoryDto} from '@/features/content/event-categories/event-category.dto';
export class UpdateEventCategoriesCommand extends Command<EventCategoryDto> {
  id!: number;
  @IsOptional() @IsString() @MaxLength(64) @ApiProperty({required: false}) title?: string;
}
