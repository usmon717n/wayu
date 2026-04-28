import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {ApiBody, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import {CreateBooksDto} from '../dto/books/create-books.dto';
import {UpdateBooksDto} from '../dto/books/update-books.dto';
import {DeleteBooksDto} from '../dto/books/delete-books.dto';
import {ListBooksDto} from '../dto/books/list-books.dto';
import {CreateBooksCommand, DeleteBooksCommand, DetailBooksQuery, ListBooksQuery, UpdateBooksCommand} from './books.cqrs';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Post('create') @ApiOperation({summary: 'Create book'}) create(@Body() dto: CreateBooksDto) { return this.commandBus.execute(new CreateBooksCommand(dto)); }
  @Put('update/:id') @ApiOperation({summary: 'Update book'}) @ApiParam({name: 'id', type: Number})
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBooksDto) { return this.commandBus.execute(new UpdateBooksCommand({...dto, id})); }
  @Delete('delete') @ApiOperation({summary: 'Delete book'}) @ApiBody({type: DeleteBooksDto}) remove(@Body() dto: DeleteBooksDto) { return this.commandBus.execute(new DeleteBooksCommand(dto)); }
  @Get('detail/:id') @ApiOperation({summary: 'Get book detail'}) @ApiParam({name: 'id', type: Number}) detail(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new DetailBooksQuery({id})); }
  @Get('list') @ApiOperation({summary: 'Get books list'}) list(@Query() dto: ListBooksDto) { return this.queryBus.execute(new ListBooksQuery(dto)); }
}
