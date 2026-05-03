import {BadRequestException, NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Faq} from '@/features/content/faqs/faq.entity';
import {Tag} from '@/features/content/tags/tag.entity';
import {FaqsTag} from '@/features/content/faqs-tags/faqs-tag.entity';
import {FaqsTagDto} from '@/features/content/faqs-tags/faqs-tag.dto';
import {CreateFaqsTagsCommand} from './create-faqs-tags.command';

@CommandHandler(CreateFaqsTagsCommand)
export class CreateFaqsTagsHandler implements ICommandHandler<CreateFaqsTagsCommand> {
  async execute(command: CreateFaqsTagsCommand): Promise<FaqsTagDto> {
    const faqExists = await Faq.existsBy({id: command.faqsId});
    if (!faqExists) throw new NotFoundException('Faq with given id not found');

    const tagExists = await Tag.existsBy({id: command.tagId});
    if (!tagExists) throw new NotFoundException('Tag with given id not found');

    const exists = await FaqsTag.exists({where: {faqsId: command.faqsId, tagId: command.tagId}});
    if (exists) throw new BadRequestException('This faqs-tag relation already exists');

    const item = FaqsTag.create({faqsId: command.faqsId, tagId: command.tagId});
    await FaqsTag.save(item);
    return plainToInstance(FaqsTagDto, item, {excludeExtraneousValues: true});
  }
}
