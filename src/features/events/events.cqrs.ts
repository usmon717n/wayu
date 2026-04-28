import {CommandHandler, ICommandHandler, IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {CreateEventsDto} from '../dto/events/create-events.dto';
import {UpdateEventsDto} from '../dto/events/update-events.dto';
import {DeleteEventsDto} from '../dto/events/delete-events.dto';
import {DetailEventsDto} from '../dto/events/detail-events.dto';
import {ListEventsDto} from '../dto/events/list-events.dto';
import {EventsService} from './events.service';

export class CreateEventsCommand { constructor(public readonly dto: CreateEventsDto) {} }
export class UpdateEventsCommand { constructor(public readonly dto: UpdateEventsDto & DetailEventsDto) {} }
export class DeleteEventsCommand { constructor(public readonly dto: DeleteEventsDto) {} }
export class DetailEventsQuery { constructor(public readonly dto: DetailEventsDto) {} }
export class ListEventsQuery { constructor(public readonly dto: ListEventsDto) {} }

@CommandHandler(CreateEventsCommand)
export class CreateEventsHandler implements ICommandHandler<CreateEventsCommand> {
  constructor(private readonly service: EventsService) {}
  execute(command: CreateEventsCommand) { return this.service.create(command.dto); }
}
@CommandHandler(UpdateEventsCommand)
export class UpdateEventsHandler implements ICommandHandler<UpdateEventsCommand> {
  constructor(private readonly service: EventsService) {}
  execute(command: UpdateEventsCommand) { return this.service.update(command.dto); }
}
@CommandHandler(DeleteEventsCommand)
export class DeleteEventsHandler implements ICommandHandler<DeleteEventsCommand> {
  constructor(private readonly service: EventsService) {}
  execute(command: DeleteEventsCommand) { return this.service.delete(command.dto); }
}
@QueryHandler(DetailEventsQuery)
export class DetailEventsHandler implements IQueryHandler<DetailEventsQuery> {
  constructor(private readonly service: EventsService) {}
  execute(query: DetailEventsQuery) { return this.service.detail(query.dto); }
}
@QueryHandler(ListEventsQuery)
export class ListEventsHandler implements IQueryHandler<ListEventsQuery> {
  constructor(private readonly service: EventsService) {}
  execute(query: ListEventsQuery) { return this.service.list(query.dto); }
}

export const EventsCommandHandlers = [CreateEventsHandler, UpdateEventsHandler, DeleteEventsHandler];
export const EventsQueryHandlers = [DetailEventsHandler, ListEventsHandler];
