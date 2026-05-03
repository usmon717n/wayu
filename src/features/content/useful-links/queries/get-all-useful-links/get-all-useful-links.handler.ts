import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {UsefulLink} from '@/features/content/useful-links/useful-link.entity';
import {UsefulLinkDto} from '@/features/content/useful-links/useful-link.dto';
import {GetAllUsefulLinksQuery} from './get-all-useful-links.query';
@QueryHandler(GetAllUsefulLinksQuery)
export class GetAllUsefulLinksHandler implements IQueryHandler<GetAllUsefulLinksQuery> {
  async execute(query: GetAllUsefulLinksQuery): Promise<UsefulLinkDto[]> {
    const take = query.filters.size ?? 10; const page = query.filters.page ?? 1; const skip = (page - 1) * take;
    const items = await UsefulLink.find({skip, take, order: {id: 'DESC'}});
    return plainToInstance(UsefulLinkDto, items, {excludeExtraneousValues: true});
  }
}
