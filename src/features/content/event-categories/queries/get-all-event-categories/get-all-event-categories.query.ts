import {Query} from '@nestjs/cqrs';
import {EventCategoryDto} from '@/features/content/event-categories/event-category.dto';
import {GetAllEventCategoriesFilters} from './get-all-event-categories.filters';
export class GetAllEventCategoriesQuery extends Query<EventCategoryDto[]> { constructor(public readonly filters: GetAllEventCategoriesFilters) { super(); } }
