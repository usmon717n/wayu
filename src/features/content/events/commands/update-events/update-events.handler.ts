import {NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Event} from '@/features/content/events/event.entity';
import {EventDto} from '@/features/content/events/event.dto';
import {EventCategory} from '@/features/content/event-categories/event-category.entity';
import {UpdateEventsCommand} from './update-events.command';
@CommandHandler(UpdateEventsCommand)
export class UpdateEventsHandler implements ICommandHandler<UpdateEventsCommand> {
  async execute(command: UpdateEventsCommand): Promise<EventDto> {
    const item = await Event.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Event with given id not found');
    if (command.categoryId !== undefined) {
      const categoryExists = await EventCategory.existsBy({id: command.categoryId});
      if (!categoryExists) throw new NotFoundException('EventCategory with given id not found');
    }
    Object.assign(item, command);
    await Event.save(item);
    return plainToInstance(EventDto, item, {excludeExtraneousValues: true});
  }
}
