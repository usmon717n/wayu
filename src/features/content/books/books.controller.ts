import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {BookDto} from '@/features/content/books/book.dto';
import {CreateBookCommand, DeleteBookCommand, GetAllBooksFilters, GetAllBooksQuery, GetBookByIdQuery, UpdateBookCommand} from '@/features/content/books/book.cqrs';

@Controller('admin/books')
export class BooksController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Get() @ApiOkResponse({type: [BookDto]}) getAll(@Query() filters: GetAllBooksFilters) { return this.queryBus.execute(new GetAllBooksQuery(filters)); }
  @Get(':id') @ApiOkResponse({type: BookDto}) getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetBookByIdQuery(id)); }
  @Post() @ApiCreatedResponse({type: BookDto}) create(@Body() command: CreateBookCommand) { return this.commandBus.execute(command); }
  @Patch(':id') @ApiOkResponse({type: BookDto}) update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateBookCommand) { command.id = id; return this.commandBus.execute(command); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.commandBus.execute(new DeleteBookCommand(id)); }
}
