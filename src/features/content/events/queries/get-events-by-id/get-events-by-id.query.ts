import {Query} from '@nestjs/cqrs';
import {EventDto} from '@/features/content/events/event.dto';
export class GetEventsByIdQuery extends Query<EventDto> { constructor(public readonly id: number) { super(); } }
