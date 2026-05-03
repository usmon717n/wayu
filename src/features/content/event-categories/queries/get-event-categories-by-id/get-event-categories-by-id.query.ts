import {Query} from '@nestjs/cqrs';
import {EventCategoryDto} from '@/features/content/event-categories/event-category.dto';
export class GetEventCategoriesByIdQuery extends Query<EventCategoryDto> { constructor(public readonly id: number) { super(); } }
