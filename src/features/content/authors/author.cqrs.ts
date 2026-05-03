import {BadRequestException, NotFoundException} from '@nestjs/common';
import {ApiProperty} from '@nestjs/swagger';
import {Command, CommandHandler, ICommandHandler, IQueryHandler, Query, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance, Type} from 'class-transformer';
import {IsInt, IsOptional, IsString, MaxLength, Min} from 'class-validator';
import {Author} from '@/features/content/authors/author.entity';
import {AuthorDto} from '@/features/content/authors/author.dto';
import {Book} from '@/features/content/books/book.entity';

export class CreateAuthorCommand extends Command<AuthorDto> { @IsString() @MaxLength(64) @ApiProperty() fullName!: string; }
export class UpdateAuthorCommand extends Command<AuthorDto> { id!: number; @IsOptional() @IsString() @MaxLength(64) @ApiProperty({required: false}) fullName?: string; }
export class DeleteAuthorCommand extends Command<void> { constructor(public readonly id: number) { super(); } }
export class GetAuthorByIdQuery extends Query<AuthorDto> { constructor(public readonly id: number) { super(); } }
export class GetAllAuthorsFilters {
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) page?: number;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) size?: number;
}
export class GetAllAuthorsQuery extends Query<AuthorDto[]> { constructor(public readonly filters: GetAllAuthorsFilters) { super(); } }

@CommandHandler(CreateAuthorCommand)
export class CreateAuthorHandler implements ICommandHandler<CreateAuthorCommand> {
  async execute(command: CreateAuthorCommand): Promise<AuthorDto> {
    const item = Author.create({fullName: command.fullName} as Author);
    await Author.save(item);
    return plainToInstance(AuthorDto, item, {excludeExtraneousValues: true});
  }
}
@CommandHandler(UpdateAuthorCommand)
export class UpdateAuthorHandler implements ICommandHandler<UpdateAuthorCommand> {
  async execute(command: UpdateAuthorCommand): Promise<AuthorDto> {
    const item = await Author.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Author with given id not found');
    if (command.fullName !== undefined) item.fullName = command.fullName;
    await Author.save(item);
    return plainToInstance(AuthorDto, item, {excludeExtraneousValues: true});
  }
}
@CommandHandler(DeleteAuthorCommand)
export class DeleteAuthorHandler implements ICommandHandler<DeleteAuthorCommand> {
  async execute(command: DeleteAuthorCommand): Promise<void> {
    const item = await Author.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Author with given id not found');
    if (await Book.existsBy({authorId: command.id})) throw new BadRequestException('Author has attached books, move or delete them first');
    await Author.remove(item);
  }
}
@QueryHandler(GetAuthorByIdQuery)
export class GetAuthorByIdHandler implements IQueryHandler<GetAuthorByIdQuery> {
  async execute(query: GetAuthorByIdQuery): Promise<AuthorDto> {
    const item = await Author.findOneBy({id: query.id});
    if (!item) throw new NotFoundException('Author with given id not found');
    return plainToInstance(AuthorDto, item, {excludeExtraneousValues: true});
  }
}
@QueryHandler(GetAllAuthorsQuery)
export class GetAllAuthorsHandler implements IQueryHandler<GetAllAuthorsQuery> {
  async execute(query: GetAllAuthorsQuery): Promise<AuthorDto[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const items = await Author.find({skip: (page - 1) * take, take, order: {id: 'DESC'}});
    return plainToInstance(AuthorDto, items, {excludeExtraneousValues: true});
  }
}
