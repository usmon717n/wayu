import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {UsefulLink} from '@/features/content/useful-links/useful-link.entity';
import {UsefulLinkDto} from '@/features/content/useful-links/useful-link.dto';
import {CreateUsefulLinksCommand} from './create-useful-links.command';
@CommandHandler(CreateUsefulLinksCommand)
export class CreateUsefulLinksHandler implements ICommandHandler<CreateUsefulLinksCommand> {
  async execute(command: CreateUsefulLinksCommand): Promise<UsefulLinkDto> {
    const item = UsefulLink.create({
      title: command.title,
      icon: command.icon,
      link: command.link,
    } as UsefulLink);
    await UsefulLink.save(item);
    return plainToInstance(UsefulLinkDto, item, {excludeExtraneousValues: true});
  }
}
