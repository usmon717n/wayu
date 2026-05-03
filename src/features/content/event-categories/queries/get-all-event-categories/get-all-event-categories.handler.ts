import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {EventCategory} from '@/features/content/event-categories/event-category.entity';
import {EventCategoryDto} from '@/features/content/event-categories/event-category.dto';
import {GetAllEventCategoriesQuery} from './get-all-event-categories.query';
@QueryHandler(GetAllEventCategoriesQuery)
export class GetAllEventCategoriesHandler implements IQueryHandler<GetAllEventCategoriesQuery> {
  async execute(query: GetAllEventCategoriesQuery): Promise<EventCategoryDto[]> {
    const take = query.filters.size ?? 10; const page = query.filters.page ?? 1; const skip = (page - 1) * take;
    const items = await EventCategory.find({skip, take, order: {id: 'DESC'}});
    return plainToInstance(EventCategoryDto, items, {excludeExtraneousValues: true});
  }
}
