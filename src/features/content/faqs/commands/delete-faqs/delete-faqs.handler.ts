import {NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Faq} from '@/features/content/faqs/faq.entity';
import {DeleteFaqsCommand} from './delete-faqs.command';

@CommandHandler(DeleteFaqsCommand)
export class DeleteFaqsHandler implements ICommandHandler<DeleteFaqsCommand> {
  async execute(command: DeleteFaqsCommand): Promise<void> {
    const item = await Faq.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Faq with given id not found');
    await Faq.remove(item);
  }
}
