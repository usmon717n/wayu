import {CommandHandler, ICommandHandler, IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {CreateBooksDto} from '../dto/books/create-books.dto';
import {UpdateBooksDto} from '../dto/books/update-books.dto';
import {DeleteBooksDto} from '../dto/books/delete-books.dto';
import {DetailBooksDto} from '../dto/books/detail-books.dto';
import {ListBooksDto} from '../dto/books/list-books.dto';
import {BooksService} from './books.service';

export class CreateBooksCommand { constructor(public readonly dto: CreateBooksDto) {} }
export class UpdateBooksCommand { constructor(public readonly dto: UpdateBooksDto & DetailBooksDto) {} }
export class DeleteBooksCommand { constructor(public readonly dto: DeleteBooksDto) {} }
export class DetailBooksQuery { constructor(public readonly dto: DetailBooksDto) {} }
export class ListBooksQuery { constructor(public readonly dto: ListBooksDto) {} }

@CommandHandler(CreateBooksCommand)
export class CreateBooksHandler implements ICommandHandler<CreateBooksCommand> {
  constructor(private readonly service: BooksService) {}
  execute(command: CreateBooksCommand) { return this.service.create(command.dto); }
}
@CommandHandler(UpdateBooksCommand)
export class UpdateBooksHandler implements ICommandHandler<UpdateBooksCommand> {
  constructor(private readonly service: BooksService) {}
  execute(command: UpdateBooksCommand) { return this.service.update(command.dto); }
}
@CommandHandler(DeleteBooksCommand)
export class DeleteBooksHandler implements ICommandHandler<DeleteBooksCommand> {
  constructor(private readonly service: BooksService) {}
  execute(command: DeleteBooksCommand) { return this.service.delete(command.dto); }
}
@QueryHandler(DetailBooksQuery)
export class DetailBooksHandler implements IQueryHandler<DetailBooksQuery> {
  constructor(private readonly service: BooksService) {}
  execute(query: DetailBooksQuery) { return this.service.detail(query.dto); }
}
@QueryHandler(ListBooksQuery)
export class ListBooksHandler implements IQueryHandler<ListBooksQuery> {
  constructor(private readonly service: BooksService) {}
  execute(query: ListBooksQuery) { return this.service.list(query.dto); }
}

export const BooksCommandHandlers = [CreateBooksHandler, UpdateBooksHandler, DeleteBooksHandler];
export const BooksQueryHandlers = [DetailBooksHandler, ListBooksHandler];
