import {BadRequestException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {ILike} from 'typeorm';
import {Tag} from '@/features/content/tags/tag.entity';
import {TagDto} from '@/features/content/tags/tag.dto';
import {CreateTagsCommand} from './create-tags.command';
@CommandHandler(CreateTagsCommand)
export class CreateTagsHandler implements ICommandHandler<CreateTagsCommand> {
  async execute(command: CreateTagsCommand): Promise<TagDto> {
    const exists = await Tag.existsBy({title: ILike(command.title)});
    if (exists) throw new BadRequestException('Title is already taken');
    const item = Tag.create({title: command.title} as Tag);
    await Tag.save(item);
    return plainToInstance(TagDto, item, {excludeExtraneousValues: true});
  }
}
