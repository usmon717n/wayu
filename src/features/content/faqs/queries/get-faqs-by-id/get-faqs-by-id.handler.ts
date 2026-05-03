import {NotFoundException} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Faq} from '@/features/content/faqs/faq.entity';
import {FaqDto} from '@/features/content/faqs/faq.dto';
import {GetFaqsByIdQuery} from './get-faqs-by-id.query';

@QueryHandler(GetFaqsByIdQuery)
export class GetFaqsByIdHandler implements IQueryHandler<GetFaqsByIdQuery> {
  async execute(query: GetFaqsByIdQuery): Promise<FaqDto> {
    const item = await Faq.findOneBy({id: query.id});
    if (!item) throw new NotFoundException('Faq with given id not found');
    return plainToInstance(FaqDto, item, {excludeExtraneousValues: true});
  }
}
