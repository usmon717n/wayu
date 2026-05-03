import {Query} from '@nestjs/cqrs';
import {EventDto} from '@/features/content/events/event.dto';
import {GetAllEventsFilters} from './get-all-events.filters';
export class GetAllEventsQuery extends Query<EventDto[]> { constructor(public readonly filters: GetAllEventsFilters) { super(); } }
