import {Query} from '@nestjs/cqrs';
import {FaqsTagDto} from '@/features/content/faqs-tags/faqs-tag.dto';
import {GetAllFaqsTagsFilters} from './get-all-faqs-tags.filters';

export class GetAllFaqsTagsQuery extends Query<FaqsTagDto[]> {
  constructor(public readonly filters: GetAllFaqsTagsFilters) { super(); }
}
