import {CommandHandler, ICommandHandler, IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {CreateNewsCategoriesDto} from '../dto/news-categories/create-news-categories.dto';
import {UpdateNewsCategoriesDto} from '../dto/news-categories/update-news-categories.dto';
import {DeleteNewsCategoriesDto} from '../dto/news-categories/delete-news-categories.dto';
import {DetailNewsCategoriesDto} from '../dto/news-categories/detail-news-categories.dto';
import {ListNewsCategoriesDto} from '../dto/news-categories/list-news-categories.dto';
import {NewsCategoriesService} from './news-categories.service';

export class CreateNewsCategoriesCommand { constructor(public readonly dto: CreateNewsCategoriesDto) {} }
export class UpdateNewsCategoriesCommand { constructor(public readonly dto: UpdateNewsCategoriesDto & DetailNewsCategoriesDto) {} }
export class DeleteNewsCategoriesCommand { constructor(public readonly dto: DeleteNewsCategoriesDto) {} }
export class DetailNewsCategoriesQuery { constructor(public readonly dto: DetailNewsCategoriesDto) {} }
export class ListNewsCategoriesQuery { constructor(public readonly dto: ListNewsCategoriesDto) {} }

@CommandHandler(CreateNewsCategoriesCommand)
export class CreateNewsCategoriesHandler implements ICommandHandler<CreateNewsCategoriesCommand> {
  constructor(private readonly service: NewsCategoriesService) {}
  execute(command: CreateNewsCategoriesCommand) { return this.service.create(command.dto); }
}
@CommandHandler(UpdateNewsCategoriesCommand)
export class UpdateNewsCategoriesHandler implements ICommandHandler<UpdateNewsCategoriesCommand> {
  constructor(private readonly service: NewsCategoriesService) {}
  execute(command: UpdateNewsCategoriesCommand) { return this.service.update(command.dto); }
}
@CommandHandler(DeleteNewsCategoriesCommand)
export class DeleteNewsCategoriesHandler implements ICommandHandler<DeleteNewsCategoriesCommand> {
  constructor(private readonly service: NewsCategoriesService) {}
  execute(command: DeleteNewsCategoriesCommand) { return this.service.delete(command.dto); }
}
@QueryHandler(DetailNewsCategoriesQuery)
export class DetailNewsCategoriesHandler implements IQueryHandler<DetailNewsCategoriesQuery> {
  constructor(private readonly service: NewsCategoriesService) {}
  execute(query: DetailNewsCategoriesQuery) { return this.service.detail(query.dto); }
}
@QueryHandler(ListNewsCategoriesQuery)
export class ListNewsCategoriesHandler implements IQueryHandler<ListNewsCategoriesQuery> {
  constructor(private readonly service: NewsCategoriesService) {}
  execute(query: ListNewsCategoriesQuery) { return this.service.list(query.dto); }
}

export const NewsCategoriesCommandHandlers = [CreateNewsCategoriesHandler, UpdateNewsCategoriesHandler, DeleteNewsCategoriesHandler];
export const NewsCategoriesQueryHandlers = [DetailNewsCategoriesHandler, ListNewsCategoriesHandler];
