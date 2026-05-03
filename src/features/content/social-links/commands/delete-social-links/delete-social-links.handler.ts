import {NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {SocialLink} from '@/features/content/social-links/social-link.entity';
import {DeleteSocialLinksCommand} from './delete-social-links.command';

@CommandHandler(DeleteSocialLinksCommand)
export class DeleteSocialLinksHandler implements ICommandHandler<DeleteSocialLinksCommand> {
  async execute(command: DeleteSocialLinksCommand): Promise<void> {
    const item = await SocialLink.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('SocialLink with given id not found');
    await SocialLink.remove(item);
  }
}
