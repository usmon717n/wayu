import {BadRequestException, NotFoundException} from '@nestjs/common';
import {ApiProperty} from '@nestjs/swagger';
import {Command, CommandHandler, ICommandHandler, IQueryHandler, Query, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance, Type} from 'class-transformer';
import {IsInt, IsOptional, IsString, MaxLength, Min} from 'class-validator';
import {ILike} from 'typeorm';
import {BookCategory} from '@/features/content/book-categories/book-category.entity';
import {BookCategoryDto} from '@/features/content/book-categories/book-category.dto';
import {Book} from '@/features/content/books/book.entity';

export class CreateBookCategoryCommand extends Command<BookCategoryDto> { @IsString() @MaxLength(64) @ApiProperty() title!: string; }
export class UpdateBookCategoryCommand extends Command<BookCategoryDto> { id!: number; @IsOptional() @IsString() @MaxLength(64) @ApiProperty({required: false}) title?: string; }
export class DeleteBookCategoryCommand extends Command<void> { constructor(public readonly id: number) { super(); } }
export class GetBookCategoryByIdQuery extends Query<BookCategoryDto> { constructor(public readonly id: number) { super(); } }
export class GetAllBookCategoriesFilters {
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) page?: number;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) size?: number;
}
export class GetAllBookCategoriesQuery extends Query<BookCategoryDto[]> { constructor(public readonly filters: GetAllBookCategoriesFilters) { super(); } }

@CommandHandler(CreateBookCategoryCommand)
export class CreateBookCategoryHandler implements ICommandHandler<CreateBookCategoryCommand> {
  async execute(command: CreateBookCategoryCommand): Promise<BookCategoryDto> {
    if (await BookCategory.existsBy({title: ILike(command.title)})) throw new BadRequestException('Title is already taken');
    const item = BookCategory.create({title: command.title} as BookCategory);
    await BookCategory.save(item);
    return plainToInstance(BookCategoryDto, item, {excludeExtraneousValues: true});
  }
}
@CommandHandler(UpdateBookCategoryCommand)
export class UpdateBookCategoryHandler implements ICommandHandler<UpdateBookCategoryCommand> {
  async execute(command: UpdateBookCategoryCommand): Promise<BookCategoryDto> {
    const item = await BookCategory.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('BookCategory with given id not found');
    if (command.title !== undefined && command.title.toLowerCase() !== item.title.toLowerCase()) {
      if (await BookCategory.existsBy({title: ILike(command.title)})) throw new BadRequestException('Title is already taken');
      item.title = command.title;
    }
    await BookCategory.save(item);
    return plainToInstance(BookCategoryDto, item, {excludeExtraneousValues: true});
  }
}
@CommandHandler(DeleteBookCategoryCommand)
export class DeleteBookCategoryHandler implements ICommandHandler<DeleteBookCategoryCommand> {
  async execute(command: DeleteBookCategoryCommand): Promise<void> {
    const item = await BookCategory.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('BookCategory with given id not found');
    if (await Book.existsBy({categoryId: command.id})) throw new BadRequestException('BookCategory has attached books, move or delete them first');
    await BookCategory.remove(item);
  }
}
@QueryHandler(GetBookCategoryByIdQuery)
export class GetBookCategoryByIdHandler implements IQueryHandler<GetBookCategoryByIdQuery> {
  async execute(query: GetBookCategoryByIdQuery): Promise<BookCategoryDto> {
    const item = await BookCategory.findOneBy({id: query.id});
    if (!item) throw new NotFoundException('BookCategory with given id not found');
    return plainToInstance(BookCategoryDto, item, {excludeExtraneousValues: true});
  }
}
@QueryHandler(GetAllBookCategoriesQuery)
export class GetAllBookCategoriesHandler implements IQueryHandler<GetAllBookCategoriesQuery> {
  async execute(query: GetAllBookCategoriesQuery): Promise<BookCategoryDto[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const items = await BookCategory.find({skip: (page - 1) * take, take, order: {id: 'DESC'}});
    return plainToInstance(BookCategoryDto, items, {excludeExtraneousValues: true});
  }
}
