import {NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Faq} from '@/features/content/faqs/faq.entity';
import {FaqDto} from '@/features/content/faqs/faq.dto';
import {UpdateFaqsCommand} from './update-faqs.command';

@CommandHandler(UpdateFaqsCommand)
export class UpdateFaqsHandler implements ICommandHandler<UpdateFaqsCommand> {
  async execute(command: UpdateFaqsCommand): Promise<FaqDto> {
    const item = await Faq.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Faq with given id not found');
    if (command.question !== undefined) item.question = command.question;
    if (command.answer !== undefined) item.answer = command.answer;
    await Faq.save(item);
    return plainToInstance(FaqDto, item, {excludeExtraneousValues: true});
  }
}
