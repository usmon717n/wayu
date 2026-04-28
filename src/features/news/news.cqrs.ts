import {CommandHandler, ICommandHandler, IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {CreateNewsDto} from '../dto/news/create-news.dto';
import {UpdateNewsDto} from '../dto/news/update-news.dto';
import {DeleteNewsDto} from '../dto/news/delete-news.dto';
import {DetailNewsDto} from '../dto/news/detail-news.dto';
import {ListNewsDto} from '../dto/news/list-news.dto';
import {NewsService} from './news.service';

export class CreateNewsCommand { constructor(public readonly dto: CreateNewsDto) {} }
export class UpdateNewsCommand { constructor(public readonly dto: UpdateNewsDto & DetailNewsDto) {} }
export class DeleteNewsCommand { constructor(public readonly dto: DeleteNewsDto) {} }
export class DetailNewsQuery { constructor(public readonly dto: DetailNewsDto) {} }
export class ListNewsQuery { constructor(public readonly dto: ListNewsDto) {} }

@CommandHandler(CreateNewsCommand)
export class CreateNewsHandler implements ICommandHandler<CreateNewsCommand> {
  constructor(private readonly service: NewsService) {}
  execute(command: CreateNewsCommand) { return this.service.create(command.dto); }
}
@CommandHandler(UpdateNewsCommand)
export class UpdateNewsHandler implements ICommandHandler<UpdateNewsCommand> {
  constructor(private readonly service: NewsService) {}
  execute(command: UpdateNewsCommand) { return this.service.update(command.dto); }
}
@CommandHandler(DeleteNewsCommand)
export class DeleteNewsHandler implements ICommandHandler<DeleteNewsCommand> {
  constructor(private readonly service: NewsService) {}
  execute(command: DeleteNewsCommand) { return this.service.delete(command.dto); }
}
@QueryHandler(DetailNewsQuery)
export class DetailNewsHandler implements IQueryHandler<DetailNewsQuery> {
  constructor(private readonly service: NewsService) {}
  execute(query: DetailNewsQuery) { return this.service.detail(query.dto); }
}
@QueryHandler(ListNewsQuery)
export class ListNewsHandler implements IQueryHandler<ListNewsQuery> {
  constructor(private readonly service: NewsService) {}
  execute(query: ListNewsQuery) { return this.service.list(query.dto); }
}

export const NewsCommandHandlers = [CreateNewsHandler, UpdateNewsHandler, DeleteNewsHandler];
export const NewsQueryHandlers = [DetailNewsHandler, ListNewsHandler];
