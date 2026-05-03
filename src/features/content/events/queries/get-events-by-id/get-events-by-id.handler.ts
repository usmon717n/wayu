import {NotFoundException} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Event} from '@/features/content/events/event.entity';
import {EventDto} from '@/features/content/events/event.dto';
import {GetEventsByIdQuery} from './get-events-by-id.query';
@QueryHandler(GetEventsByIdQuery)
export class GetEventsByIdHandler implements IQueryHandler<GetEventsByIdQuery> {
  async execute(query: GetEventsByIdQuery): Promise<EventDto> {
    const item = await Event.findOneBy({id: query.id});
    if (!item) throw new NotFoundException('Event with given id not found');
    return plainToInstance(EventDto, item, {excludeExtraneousValues: true});
  }
}
