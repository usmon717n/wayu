import {NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {UsefulLink} from '@/features/content/useful-links/useful-link.entity';
import {DeleteUsefulLinksCommand} from './delete-useful-links.command';
@CommandHandler(DeleteUsefulLinksCommand)
export class DeleteUsefulLinksHandler implements ICommandHandler<DeleteUsefulLinksCommand> {
  async execute(command: DeleteUsefulLinksCommand): Promise<void> {
    const item = await UsefulLink.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('UsefulLink with given id not found');
    await UsefulLink.remove(item);
  }
}
