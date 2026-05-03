import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {IsString, MaxLength} from 'class-validator';
import {EventCategoryDto} from '@/features/content/event-categories/event-category.dto';

export class CreateEventCategoriesCommand extends Command<EventCategoryDto> {
  @IsString() @MaxLength(64) @ApiProperty() title!: string;
}
