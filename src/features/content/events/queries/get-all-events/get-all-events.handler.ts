import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Event} from '@/features/content/events/event.entity';
import {EventDto} from '@/features/content/events/event.dto';
import {GetAllEventsQuery} from './get-all-events.query';
@QueryHandler(GetAllEventsQuery)
export class GetAllEventsHandler implements IQueryHandler<GetAllEventsQuery> {
  async execute(query: GetAllEventsQuery): Promise<EventDto[]> {
    const take = query.filters.size ?? 10; const page = query.filters.page ?? 1; const skip = (page - 1) * take;
    const items = await Event.find({skip, take, order: {id: 'DESC'}});
    return plainToInstance(EventDto, items, {excludeExtraneousValues: true});
  }
}
