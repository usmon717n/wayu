import {NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Event} from '@/features/content/events/event.entity';
import {EventDto} from '@/features/content/events/event.dto';
import {EventCategory} from '@/features/content/event-categories/event-category.entity';
import {CreateEventsCommand} from './create-events.command';
@CommandHandler(CreateEventsCommand)
export class CreateEventsHandler implements ICommandHandler<CreateEventsCommand> {
  async execute(command: CreateEventsCommand): Promise<EventDto> {
    const categoryExists = await EventCategory.existsBy({id: command.categoryId});
    if (!categoryExists) throw new NotFoundException('EventCategory with given id not found');
    const item = Event.create({
      categoryId: command.categoryId,
      title: command.title,
      content: command.content,
      image: command.image,
      date: command.date,
      address: command.address,
    } as Event);
    await Event.save(item);
    return plainToInstance(EventDto, item, {excludeExtraneousValues: true});
  }
}
