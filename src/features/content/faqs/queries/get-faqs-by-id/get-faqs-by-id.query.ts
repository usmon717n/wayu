import {Query} from '@nestjs/cqrs';
import {FaqDto} from '@/features/content/faqs/faq.dto';

export class GetFaqsByIdQuery extends Query<FaqDto> {
  constructor(public readonly id: number) { super(); }
}
