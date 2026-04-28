import {CommandHandler, ICommandHandler, IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {CreateEventCategoriesDto} from '../dto/event-categories/create-event-categories.dto';
import {UpdateEventCategoriesDto} from '../dto/event-categories/update-event-categories.dto';
import {DeleteEventCategoriesDto} from '../dto/event-categories/delete-event-categories.dto';
import {DetailEventCategoriesDto} from '../dto/event-categories/detail-event-categories.dto';
import {ListEventCategoriesDto} from '../dto/event-categories/list-event-categories.dto';
import {EventCategoriesService} from './event-categories.service';

export class CreateEventCategoriesCommand { constructor(public readonly dto: CreateEventCategoriesDto) {} }
export class UpdateEventCategoriesCommand { constructor(public readonly dto: UpdateEventCategoriesDto & DetailEventCategoriesDto) {} }
export class DeleteEventCategoriesCommand { constructor(public readonly dto: DeleteEventCategoriesDto) {} }
export class DetailEventCategoriesQuery { constructor(public readonly dto: DetailEventCategoriesDto) {} }
export class ListEventCategoriesQuery { constructor(public readonly dto: ListEventCategoriesDto) {} }

@CommandHandler(CreateEventCategoriesCommand)
export class CreateEventCategoriesHandler implements ICommandHandler<CreateEventCategoriesCommand> {
  constructor(private readonly service: EventCategoriesService) {}
  execute(command: CreateEventCategoriesCommand) { return this.service.create(command.dto); }
}
@CommandHandler(UpdateEventCategoriesCommand)
export class UpdateEventCategoriesHandler implements ICommandHandler<UpdateEventCategoriesCommand> {
  constructor(private readonly service: EventCategoriesService) {}
  execute(command: UpdateEventCategoriesCommand) { return this.service.update(command.dto); }
}
@CommandHandler(DeleteEventCategoriesCommand)
export class DeleteEventCategoriesHandler implements ICommandHandler<DeleteEventCategoriesCommand> {
  constructor(private readonly service: EventCategoriesService) {}
  execute(command: DeleteEventCategoriesCommand) { return this.service.delete(command.dto); }
}
@QueryHandler(DetailEventCategoriesQuery)
export class DetailEventCategoriesHandler implements IQueryHandler<DetailEventCategoriesQuery> {
  constructor(private readonly service: EventCategoriesService) {}
  execute(query: DetailEventCategoriesQuery) { return this.service.detail(query.dto); }
}
@QueryHandler(ListEventCategoriesQuery)
export class ListEventCategoriesHandler implements IQueryHandler<ListEventCategoriesQuery> {
  constructor(private readonly service: EventCategoriesService) {}
  execute(query: ListEventCategoriesQuery) { return this.service.list(query.dto); }
}

export const EventCategoriesCommandHandlers = [CreateEventCategoriesHandler, UpdateEventCategoriesHandler, DeleteEventCategoriesHandler];
export const EventCategoriesQueryHandlers = [DetailEventCategoriesHandler, ListEventCategoriesHandler];
