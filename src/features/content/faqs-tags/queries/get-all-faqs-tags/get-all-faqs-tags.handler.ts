import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {FaqsTag} from '@/features/content/faqs-tags/faqs-tag.entity';
import {FaqsTagDto} from '@/features/content/faqs-tags/faqs-tag.dto';
import {GetAllFaqsTagsQuery} from './get-all-faqs-tags.query';

@QueryHandler(GetAllFaqsTagsQuery)
export class GetAllFaqsTagsHandler implements IQueryHandler<GetAllFaqsTagsQuery> {
  async execute(query: GetAllFaqsTagsQuery): Promise<FaqsTagDto[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const skip = (page - 1) * take;
    const where: {faqsId?: number; tagId?: number} = {};
    if (query.filters.faqsId !== undefined) where.faqsId = query.filters.faqsId;
    if (query.filters.tagId !== undefined) where.tagId = query.filters.tagId;
    const items = await FaqsTag.find({where, skip, take});
    return plainToInstance(FaqsTagDto, items, {excludeExtraneousValues: true});
  }
}
