import {CommandHandler, ICommandHandler, IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {CreateAuthorsDto} from '../dto/authors/create-authors.dto';
import {UpdateAuthorsDto} from '../dto/authors/update-authors.dto';
import {DeleteAuthorsDto} from '../dto/authors/delete-authors.dto';
import {DetailAuthorsDto} from '../dto/authors/detail-authors.dto';
import {ListAuthorsDto} from '../dto/authors/list-authors.dto';
import {AuthorsService} from './authors.service';

export class CreateAuthorsCommand { constructor(public readonly dto: CreateAuthorsDto) {} }
export class UpdateAuthorsCommand { constructor(public readonly dto: UpdateAuthorsDto & DetailAuthorsDto) {} }
export class DeleteAuthorsCommand { constructor(public readonly dto: DeleteAuthorsDto) {} }
export class DetailAuthorsQuery { constructor(public readonly dto: DetailAuthorsDto) {} }
export class ListAuthorsQuery { constructor(public readonly dto: ListAuthorsDto) {} }

@CommandHandler(CreateAuthorsCommand)
export class CreateAuthorsHandler implements ICommandHandler<CreateAuthorsCommand> {
  constructor(private readonly service: AuthorsService) {}
  execute(command: CreateAuthorsCommand) { return this.service.create(command.dto); }
}

@CommandHandler(UpdateAuthorsCommand)
export class UpdateAuthorsHandler implements ICommandHandler<UpdateAuthorsCommand> {
  constructor(private readonly service: AuthorsService) {}
  execute(command: UpdateAuthorsCommand) { return this.service.update(command.dto); }
}

@CommandHandler(DeleteAuthorsCommand)
export class DeleteAuthorsHandler implements ICommandHandler<DeleteAuthorsCommand> {
  constructor(private readonly service: AuthorsService) {}
  execute(command: DeleteAuthorsCommand) { return this.service.delete(command.dto); }
}

@QueryHandler(DetailAuthorsQuery)
export class DetailAuthorsHandler implements IQueryHandler<DetailAuthorsQuery> {
  constructor(private readonly service: AuthorsService) {}
  execute(query: DetailAuthorsQuery) { return this.service.detail(query.dto); }
}

@QueryHandler(ListAuthorsQuery)
export class ListAuthorsHandler implements IQueryHandler<ListAuthorsQuery> {
  constructor(private readonly service: AuthorsService) {}
  execute(query: ListAuthorsQuery) { return this.service.list(query.dto); }
}

export const AuthorsCommandHandlers = [CreateAuthorsHandler, UpdateAuthorsHandler, DeleteAuthorsHandler];
export const AuthorsQueryHandlers = [DetailAuthorsHandler, ListAuthorsHandler];
