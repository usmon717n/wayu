import {NotFoundException} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {UsefulLink} from '@/features/content/useful-links/useful-link.entity';
import {UsefulLinkDto} from '@/features/content/useful-links/useful-link.dto';
import {GetUsefulLinksByIdQuery} from './get-useful-links-by-id.query';
@QueryHandler(GetUsefulLinksByIdQuery)
export class GetUsefulLinksByIdHandler implements IQueryHandler<GetUsefulLinksByIdQuery> {
  async execute(query: GetUsefulLinksByIdQuery): Promise<UsefulLinkDto> {
    const item = await UsefulLink.findOneBy({id: query.id});
    if (!item) throw new NotFoundException('UsefulLink with given id not found');
    return plainToInstance(UsefulLinkDto, item, {excludeExtraneousValues: true});
  }
}
