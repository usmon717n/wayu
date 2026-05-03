import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {BookCategoryDto} from '@/features/content/book-categories/book-category.dto';
import {CreateBookCategoryCommand, DeleteBookCategoryCommand, GetAllBookCategoriesFilters, GetAllBookCategoriesQuery, GetBookCategoryByIdQuery, UpdateBookCategoryCommand} from '@/features/content/book-categories/book-category.cqrs';

@Controller('admin/book-categories')
export class BookCategoriesController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Get() @ApiOkResponse({type: [BookCategoryDto]}) getAll(@Query() filters: GetAllBookCategoriesFilters) { return this.queryBus.execute(new GetAllBookCategoriesQuery(filters)); }
  @Get(':id') @ApiOkResponse({type: BookCategoryDto}) getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetBookCategoryByIdQuery(id)); }
  @Post() @ApiCreatedResponse({type: BookCategoryDto}) create(@Body() command: CreateBookCategoryCommand) { return this.commandBus.execute(command); }
  @Patch(':id') @ApiOkResponse({type: BookCategoryDto}) update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateBookCategoryCommand) { command.id = id; return this.commandBus.execute(command); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.commandBus.execute(new DeleteBookCategoryCommand(id)); }
}
