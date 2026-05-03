import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Faq} from '@/features/content/faqs/faq.entity';
import {FaqDto} from '@/features/content/faqs/faq.dto';
import {CreateFaqsCommand} from './create-faqs.command';

@CommandHandler(CreateFaqsCommand)
export class CreateFaqsHandler implements ICommandHandler<CreateFaqsCommand> {
  async execute(command: CreateFaqsCommand): Promise<FaqDto> {
    const item = Faq.create({question: command.question, answer: command.answer} as Faq);
    await Faq.save(item);
    return plainToInstance(FaqDto, item, {excludeExtraneousValues: true});
  }
}
