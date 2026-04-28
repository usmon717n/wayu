import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {ApiBody, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import {CreateBookCategoriesDto} from '../dto/book-categories/create-book-categories.dto';
import {UpdateBookCategoriesDto} from '../dto/book-categories/update-book-categories.dto';
import {DeleteBookCategoriesDto} from '../dto/book-categories/delete-book-categories.dto';
import {ListBookCategoriesDto} from '../dto/book-categories/list-book-categories.dto';
import {CreateBookCategoriesCommand, DeleteBookCategoriesCommand, DetailBookCategoriesQuery, ListBookCategoriesQuery, UpdateBookCategoriesCommand} from './book-categories.cqrs';

@ApiTags('Book Categories')
@Controller('book-categories')
export class BookCategoriesController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Post('create') @ApiOperation({summary: 'Create book category'}) create(@Body() dto: CreateBookCategoriesDto) { return this.commandBus.execute(new CreateBookCategoriesCommand(dto)); }
  @Put('update/:id') @ApiOperation({summary: 'Update book category'}) @ApiParam({name: 'id', type: Number})
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookCategoriesDto) { return this.commandBus.execute(new UpdateBookCategoriesCommand({...dto, id})); }
  @Delete('delete') @ApiOperation({summary: 'Delete book category'}) @ApiBody({type: DeleteBookCategoriesDto}) remove(@Body() dto: DeleteBookCategoriesDto) { return this.commandBus.execute(new DeleteBookCategoriesCommand(dto)); }
  @Get('detail/:id') @ApiOperation({summary: 'Get book category detail'}) @ApiParam({name: 'id', type: Number}) detail(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new DetailBookCategoriesQuery({id})); }
  @Get('list') @ApiOperation({summary: 'Get book categories list'}) list(@Query() dto: ListBookCategoriesDto) { return this.queryBus.execute(new ListBookCategoriesQuery(dto)); }
}
