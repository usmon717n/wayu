import {NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {NewsTag} from '@/features/content/news-tags/news-tag.entity';
import {DeleteNewsTagsCommand} from './delete-news-tags.command';
@CommandHandler(DeleteNewsTagsCommand)
export class DeleteNewsTagsHandler implements ICommandHandler<DeleteNewsTagsCommand> {
  async execute(command: DeleteNewsTagsCommand): Promise<void> {
    const item = await NewsTag.findOneBy({newsId: command.newsId, tagId: command.tagId});
    if (!item) throw new NotFoundException('NewsTag relation not found');
    await NewsTag.remove(item);
  }
}
