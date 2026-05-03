import {NotFoundException} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {EventCategory} from '@/features/content/event-categories/event-category.entity';
import {EventCategoryDto} from '@/features/content/event-categories/event-category.dto';
import {GetEventCategoriesByIdQuery} from './get-event-categories-by-id.query';
@QueryHandler(GetEventCategoriesByIdQuery)
export class GetEventCategoriesByIdHandler implements IQueryHandler<GetEventCategoriesByIdQuery> {
  async execute(query: GetEventCategoriesByIdQuery): Promise<EventCategoryDto> {
    const item = await EventCategory.findOneBy({id: query.id});
    if (!item) throw new NotFoundException('EventCategory with given id not found');
    return plainToInstance(EventCategoryDto, item, {excludeExtraneousValues: true});
  }
}
