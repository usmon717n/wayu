import {CommandHandler, ICommandHandler, IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {CreateBookCategoriesDto} from '../dto/book-categories/create-book-categories.dto';
import {UpdateBookCategoriesDto} from '../dto/book-categories/update-book-categories.dto';
import {DeleteBookCategoriesDto} from '../dto/book-categories/delete-book-categories.dto';
import {DetailBookCategoriesDto} from '../dto/book-categories/detail-book-categories.dto';
import {ListBookCategoriesDto} from '../dto/book-categories/list-book-categories.dto';
import {BookCategoriesService} from './book-categories.service';

export class CreateBookCategoriesCommand { constructor(public readonly dto: CreateBookCategoriesDto) {} }
export class UpdateBookCategoriesCommand { constructor(public readonly dto: UpdateBookCategoriesDto & DetailBookCategoriesDto) {} }
export class DeleteBookCategoriesCommand { constructor(public readonly dto: DeleteBookCategoriesDto) {} }
export class DetailBookCategoriesQuery { constructor(public readonly dto: DetailBookCategoriesDto) {} }
export class ListBookCategoriesQuery { constructor(public readonly dto: ListBookCategoriesDto) {} }

@CommandHandler(CreateBookCategoriesCommand)
export class CreateBookCategoriesHandler implements ICommandHandler<CreateBookCategoriesCommand> {
  constructor(private readonly service: BookCategoriesService) {}
  execute(command: CreateBookCategoriesCommand) { return this.service.create(command.dto); }
}
@CommandHandler(UpdateBookCategoriesCommand)
export class UpdateBookCategoriesHandler implements ICommandHandler<UpdateBookCategoriesCommand> {
  constructor(private readonly service: BookCategoriesService) {}
  execute(command: UpdateBookCategoriesCommand) { return this.service.update(command.dto); }
}
@CommandHandler(DeleteBookCategoriesCommand)
export class DeleteBookCategoriesHandler implements ICommandHandler<DeleteBookCategoriesCommand> {
  constructor(private readonly service: BookCategoriesService) {}
  execute(command: DeleteBookCategoriesCommand) { return this.service.delete(command.dto); }
}
@QueryHandler(DetailBookCategoriesQuery)
export class DetailBookCategoriesHandler implements IQueryHandler<DetailBookCategoriesQuery> {
  constructor(private readonly service: BookCategoriesService) {}
  execute(query: DetailBookCategoriesQuery) { return this.service.detail(query.dto); }
}
@QueryHandler(ListBookCategoriesQuery)
export class ListBookCategoriesHandler implements IQueryHandler<ListBookCategoriesQuery> {
  constructor(private readonly service: BookCategoriesService) {}
  execute(query: ListBookCategoriesQuery) { return this.service.list(query.dto); }
}

export const BookCategoriesCommandHandlers = [CreateBookCategoriesHandler, UpdateBookCategoriesHandler, DeleteBookCategoriesHandler];
export const BookCategoriesQueryHandlers = [DetailBookCategoriesHandler, ListBookCategoriesHandler];
