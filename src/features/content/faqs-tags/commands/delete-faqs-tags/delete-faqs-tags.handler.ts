import {NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {FaqsTag} from '@/features/content/faqs-tags/faqs-tag.entity';
import {DeleteFaqsTagsCommand} from './delete-faqs-tags.command';

@CommandHandler(DeleteFaqsTagsCommand)
export class DeleteFaqsTagsHandler implements ICommandHandler<DeleteFaqsTagsCommand> {
  async execute(command: DeleteFaqsTagsCommand): Promise<void> {
    const item = await FaqsTag.findOneBy({faqsId: command.faqsId, tagId: command.tagId});
    if (!item) throw new NotFoundException('FaqsTag relation not found');
    await FaqsTag.remove(item);
  }
}
