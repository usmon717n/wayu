import {NotFoundException} from '@nestjs/common';
import {ApiProperty} from '@nestjs/swagger';
import {Command, CommandHandler, ICommandHandler, IQueryHandler, Query, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance, Type} from 'class-transformer';
import {IsInt, IsOptional, IsString, MaxLength, Min} from 'class-validator';
import {Author} from '@/features/content/authors/author.entity';
import {BookCategory} from '@/features/content/book-categories/book-category.entity';
import {Book} from '@/features/content/books/book.entity';
import {BookDto} from '@/features/content/books/book.dto';

export class CreateBookCommand extends Command<BookDto> {
  @IsInt() @Min(1) @Type(() => Number) @ApiProperty() authorId!: number;
  @IsInt() @Min(1) @Type(() => Number) @ApiProperty() categoryId!: number;
  @IsString() @MaxLength(256) @ApiProperty() title!: string;
  @IsString() @MaxLength(128) @ApiProperty() image!: string;
  @IsOptional() @IsString() @ApiProperty({required: false, nullable: true}) description?: string;
  @IsString() @MaxLength(256) @ApiProperty() file!: string;
  @IsInt() @Min(1) @Type(() => Number) @ApiProperty() pages!: number;
  @IsInt() @Min(1) @Type(() => Number) @ApiProperty() year!: number;
}

export class UpdateBookCommand extends Command<BookDto> {
  id!: number;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) authorId?: number;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) categoryId?: number;
  @IsOptional() @IsString() @MaxLength(256) @ApiProperty({required: false}) title?: string;
  @IsOptional() @IsString() @MaxLength(128) @ApiProperty({required: false}) image?: string;
  @IsOptional() @IsString() @ApiProperty({required: false, nullable: true}) description?: string;
  @IsOptional() @IsString() @MaxLength(256) @ApiProperty({required: false}) file?: string;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) pages?: number;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) year?: number;
}

export class DeleteBookCommand extends Command<void> { constructor(public readonly id: number) { super(); } }
export class GetBookByIdQuery extends Query<BookDto> { constructor(public readonly id: number) { super(); } }
export class GetAllBooksFilters {
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) authorId?: number;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) categoryId?: number;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) page?: number;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) size?: number;
}
export class GetAllBooksQuery extends Query<BookDto[]> { constructor(public readonly filters: GetAllBooksFilters) { super(); } }

async function ensureBookRefs(authorId: number, categoryId: number) {
  if (!await Author.existsBy({id: authorId})) throw new NotFoundException('Author with given id not found');
  if (!await BookCategory.existsBy({id: categoryId})) throw new NotFoundException('BookCategory with given id not found');
}

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  async execute(command: CreateBookCommand): Promise<BookDto> {
    await ensureBookRefs(command.authorId, command.categoryId);
    const item = Book.create({
      authorId: command.authorId,
      categoryId: command.categoryId,
      title: command.title,
      image: command.image,
      description: command.description,
      file: command.file,
      pages: command.pages,
      year: command.year,
    } as Book);
    await Book.save(item);
    return plainToInstance(BookDto, item, {excludeExtraneousValues: true});
  }
}
@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
  async execute(command: UpdateBookCommand): Promise<BookDto> {
    const item = await Book.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Book with given id not found');
    if (command.authorId !== undefined && !await Author.existsBy({id: command.authorId})) throw new NotFoundException('Author with given id not found');
    if (command.categoryId !== undefined && !await BookCategory.existsBy({id: command.categoryId})) throw new NotFoundException('BookCategory with given id not found');
    Object.assign(item, command);
    await Book.save(item);
    return plainToInstance(BookDto, item, {excludeExtraneousValues: true});
  }
}
@CommandHandler(DeleteBookCommand)
export class DeleteBookHandler implements ICommandHandler<DeleteBookCommand> {
  async execute(command: DeleteBookCommand): Promise<void> {
    const item = await Book.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Book with given id not found');
    await Book.remove(item);
  }
}
@QueryHandler(GetBookByIdQuery)
export class GetBookByIdHandler implements IQueryHandler<GetBookByIdQuery> {
  async execute(query: GetBookByIdQuery): Promise<BookDto> {
    const item = await Book.findOneBy({id: query.id});
    if (!item) throw new NotFoundException('Book with given id not found');
    return plainToInstance(BookDto, item, {excludeExtraneousValues: true});
  }
}
@QueryHandler(GetAllBooksQuery)
export class GetAllBooksHandler implements IQueryHandler<GetAllBooksQuery> {
  async execute(query: GetAllBooksQuery): Promise<BookDto[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const where: {authorId?: number; categoryId?: number} = {};
    if (query.filters.authorId !== undefined) where.authorId = query.filters.authorId;
    if (query.filters.categoryId !== undefined) where.categoryId = query.filters.categoryId;
    const items = await Book.find({where, skip: (page - 1) * take, take, order: {id: 'DESC'}});
    return plainToInstance(BookDto, items, {excludeExtraneousValues: true});
  }
}
