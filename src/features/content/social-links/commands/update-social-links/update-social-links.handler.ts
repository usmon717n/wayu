import {NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {SocialLink} from '@/features/content/social-links/social-link.entity';
import {SocialLinkDto} from '@/features/content/social-links/social-link.dto';
import {UpdateSocialLinksCommand} from './update-social-links.command';

@CommandHandler(UpdateSocialLinksCommand)
export class UpdateSocialLinksHandler implements ICommandHandler<UpdateSocialLinksCommand> {
  async execute(command: UpdateSocialLinksCommand): Promise<SocialLinkDto> {
    const item = await SocialLink.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('SocialLink with given id not found');
    Object.assign(item, command);
    await SocialLink.save(item);
    return plainToInstance(SocialLinkDto, item, {excludeExtraneousValues: true});
  }
}
