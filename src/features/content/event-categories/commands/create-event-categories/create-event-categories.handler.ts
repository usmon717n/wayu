import {BadRequestException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {ILike} from 'typeorm';
import {EventCategory} from '@/features/content/event-categories/event-category.entity';
import {EventCategoryDto} from '@/features/content/event-categories/event-category.dto';
import {CreateEventCategoriesCommand} from './create-event-categories.command';
@CommandHandler(CreateEventCategoriesCommand)
export class CreateEventCategoriesHandler implements ICommandHandler<CreateEventCategoriesCommand> {
  async execute(command: CreateEventCategoriesCommand): Promise<EventCategoryDto> {
    const exists = await EventCategory.existsBy({title: ILike(command.title)});
    if (exists) throw new BadRequestException('Title is already taken');
    const item = EventCategory.create({title: command.title} as EventCategory);
    await EventCategory.save(item);
    return plainToInstance(EventCategoryDto, item, {excludeExtraneousValues: true});
  }
}
