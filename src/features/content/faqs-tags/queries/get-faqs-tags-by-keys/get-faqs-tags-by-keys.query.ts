import {Query} from '@nestjs/cqrs';
import {FaqsTagDto} from '@/features/content/faqs-tags/faqs-tag.dto';

export class GetFaqsTagsByKeysQuery extends Query<FaqsTagDto> {
  constructor(public readonly faqsId: number, public readonly tagId: number) { super(); }
}
