import {BadRequestException, NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Tag} from '@/features/content/tags/tag.entity';
import {NewsTag} from '@/features/content/news-tags/news-tag.entity';
import {DeleteTagsCommand} from './delete-tags.command';
@CommandHandler(DeleteTagsCommand)
export class DeleteTagsHandler implements ICommandHandler<DeleteTagsCommand> {
  async execute(command: DeleteTagsCommand): Promise<void> {
    const item = await Tag.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Tag with given id not found');
    const attached = await NewsTag.exists({where: {tagId: command.id}});
    if (attached) throw new BadRequestException('Tag has attached news tags, delete links first');
    await Tag.remove(item);
  }
}
