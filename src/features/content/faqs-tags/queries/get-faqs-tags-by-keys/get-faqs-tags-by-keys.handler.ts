import {NotFoundException} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {FaqsTag} from '@/features/content/faqs-tags/faqs-tag.entity';
import {FaqsTagDto} from '@/features/content/faqs-tags/faqs-tag.dto';
import {GetFaqsTagsByKeysQuery} from './get-faqs-tags-by-keys.query';

@QueryHandler(GetFaqsTagsByKeysQuery)
export class GetFaqsTagsByKeysHandler implements IQueryHandler<GetFaqsTagsByKeysQuery> {
  async execute(query: GetFaqsTagsByKeysQuery): Promise<FaqsTagDto> {
    const item = await FaqsTag.findOneBy({faqsId: query.faqsId, tagId: query.tagId});
    if (!item) throw new NotFoundException('FaqsTag relation not found');
    return plainToInstance(FaqsTagDto, item, {excludeExtraneousValues: true});
  }
}
