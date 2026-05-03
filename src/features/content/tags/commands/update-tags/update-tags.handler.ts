import {BadRequestException, NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {ILike} from 'typeorm';
import {Tag} from '@/features/content/tags/tag.entity';
import {TagDto} from '@/features/content/tags/tag.dto';
import {UpdateTagsCommand} from './update-tags.command';
@CommandHandler(UpdateTagsCommand)
export class UpdateTagsHandler implements ICommandHandler<UpdateTagsCommand> {
  async execute(command: UpdateTagsCommand): Promise<TagDto> {
    const item = await Tag.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Tag with given id not found');
    if (command.title !== undefined && command.title.toLowerCase() !== item.title.toLowerCase()) {
      const exists = await Tag.existsBy({title: ILike(command.title)});
      if (exists) throw new BadRequestException('Title is already taken');
      item.title = command.title;
    }
    await Tag.save(item);
    return plainToInstance(TagDto, item, {excludeExtraneousValues: true});
  }
}
