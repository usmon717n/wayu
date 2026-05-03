import {BadRequestException, NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {DeleteEventCategoriesCommand} from './delete-event-categories.command';
import {EventCategory} from '@/features/content/event-categories/event-category.entity';
import {Event} from '@/features/content/events/event.entity';
@CommandHandler(DeleteEventCategoriesCommand)
export class DeleteEventCategoriesHandler implements ICommandHandler<DeleteEventCategoriesCommand> {
  async execute(command: DeleteEventCategoriesCommand): Promise<void> {
    const item = await EventCategory.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('EventCategory with given id not found');
    const attached = await Event.existsBy({categoryId: command.id});
    if (attached) throw new BadRequestException('EventCategory has attached events, move or delete them first');
    await EventCategory.remove(item);
  }
}
