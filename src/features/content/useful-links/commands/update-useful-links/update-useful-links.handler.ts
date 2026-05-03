import {NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {UsefulLink} from '@/features/content/useful-links/useful-link.entity';
import {UsefulLinkDto} from '@/features/content/useful-links/useful-link.dto';
import {UpdateUsefulLinksCommand} from './update-useful-links.command';
@CommandHandler(UpdateUsefulLinksCommand)
export class UpdateUsefulLinksHandler implements ICommandHandler<UpdateUsefulLinksCommand> {
  async execute(command: UpdateUsefulLinksCommand): Promise<UsefulLinkDto> {
    const item = await UsefulLink.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('UsefulLink with given id not found');
    Object.assign(item, command);
    await UsefulLink.save(item);
    return plainToInstance(UsefulLinkDto, item, {excludeExtraneousValues: true});
  }
}
