import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {SocialLink} from '@/features/content/social-links/social-link.entity';
import {SocialLinkDto} from '@/features/content/social-links/social-link.dto';
import {CreateSocialLinksCommand} from './create-social-links.command';

@CommandHandler(CreateSocialLinksCommand)
export class CreateSocialLinksHandler implements ICommandHandler<CreateSocialLinksCommand> {
  async execute(command: CreateSocialLinksCommand): Promise<SocialLinkDto> {
    const item = SocialLink.create({
      title: command.title,
      icon: command.icon,
      link: command.link,
    } as SocialLink);
    await SocialLink.save(item);
    return plainToInstance(SocialLinkDto, item, {excludeExtraneousValues: true});
  }
}
