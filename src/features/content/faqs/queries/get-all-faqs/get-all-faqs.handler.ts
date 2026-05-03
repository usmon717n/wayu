import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Faq} from '@/features/content/faqs/faq.entity';
import {FaqDto} from '@/features/content/faqs/faq.dto';
import {GetAllFaqsQuery} from './get-all-faqs.query';

@QueryHandler(GetAllFaqsQuery)
export class GetAllFaqsHandler implements IQueryHandler<GetAllFaqsQuery> {
  async execute(query: GetAllFaqsQuery): Promise<FaqDto[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const skip = (page - 1) * take;
    const items = await Faq.find({skip, take, order: {id: 'DESC'}});
    return plainToInstance(FaqDto, items, {excludeExtraneousValues: true});
  }
}
