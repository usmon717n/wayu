import {Query} from '@nestjs/cqrs';
import {FaqDto} from '@/features/content/faqs/faq.dto';
import {GetAllFaqsFilters} from './get-all-faqs.filters';

export class GetAllFaqsQuery extends Query<FaqDto[]> {
  constructor(public readonly filters: GetAllFaqsFilters) { super(); }
}
