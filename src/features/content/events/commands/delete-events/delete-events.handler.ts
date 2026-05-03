import {NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Event} from '@/features/content/events/event.entity';
import {DeleteEventsCommand} from './delete-events.command';
@CommandHandler(DeleteEventsCommand)
export class DeleteEventsHandler implements ICommandHandler<DeleteEventsCommand> {
  async execute(command: DeleteEventsCommand): Promise<void> {
    const item = await Event.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Event with given id not found');
    await Event.remove(item);
  }
}
