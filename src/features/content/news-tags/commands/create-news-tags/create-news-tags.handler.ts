import {BadRequestException, NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {News} from '@/features/news/news/news.entity';
import {Tag} from '@/features/content/tags/tag.entity';
import {NewsTag} from '@/features/content/news-tags/news-tag.entity';
import {NewsTagDto} from '@/features/content/news-tags/news-tag.dto';
import {CreateNewsTagsCommand} from './create-news-tags.command';
@CommandHandler(CreateNewsTagsCommand)
export class CreateNewsTagsHandler implements ICommandHandler<CreateNewsTagsCommand> {
  async execute(command: CreateNewsTagsCommand): Promise<NewsTagDto> {
    const newsExists = await News.existsBy({id: command.newsId});
    if (!newsExists) throw new NotFoundException('News with given id not found');
    const tagExists = await Tag.existsBy({id: command.tagId});
    if (!tagExists) throw new NotFoundException('Tag with given id not found');
    const exists = await NewsTag.exists({where: {newsId: command.newsId, tagId: command.tagId}});
    if (exists) throw new BadRequestException('This news-tag relation already exists');
    const item = NewsTag.create({newsId: command.newsId, tagId: command.tagId});
    await NewsTag.save(item);
    return plainToInstance(NewsTagDto, item, {excludeExtraneousValues: true});
  }
}
