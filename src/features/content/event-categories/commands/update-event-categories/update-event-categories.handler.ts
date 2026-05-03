import {BadRequestException, NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {ILike} from 'typeorm';
import {EventCategory} from '@/features/content/event-categories/event-category.entity';
import {EventCategoryDto} from '@/features/content/event-categories/event-category.dto';
import {UpdateEventCategoriesCommand} from './update-event-categories.command';
@CommandHandler(UpdateEventCategoriesCommand)
export class UpdateEventCategoriesHandler implements ICommandHandler<UpdateEventCategoriesCommand> {
  async execute(command: UpdateEventCategoriesCommand): Promise<EventCategoryDto> {
    const item = await EventCategory.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('EventCategory with given id not found');
    if (command.title !== undefined && command.title.toLowerCase() !== item.title.toLowerCase()) {
      const exists = await EventCategory.existsBy({title: ILike(command.title)});
      if (exists) throw new BadRequestException('Title is already taken');
      item.title = command.title;
    }
    await EventCategory.save(item);
    return plainToInstance(EventCategoryDto, item, {excludeExtraneousValues: true});
  }
}
