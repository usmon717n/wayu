import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {ApiBody, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import {CreateNewsCategoriesDto} from '../dto/news-categories/create-news-categories.dto';
import {UpdateNewsCategoriesDto} from '../dto/news-categories/update-news-categories.dto';
import {DeleteNewsCategoriesDto} from '../dto/news-categories/delete-news-categories.dto';
import {ListNewsCategoriesDto} from '../dto/news-categories/list-news-categories.dto';
import {CreateNewsCategoriesCommand, DeleteNewsCategoriesCommand, DetailNewsCategoriesQuery, ListNewsCategoriesQuery, UpdateNewsCategoriesCommand} from './news-categories.cqrs';

@ApiTags('News Categories')
@Controller('news-categories')
export class NewsCategoriesController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Post('create') @ApiOperation({summary: 'Create news category'}) create(@Body() dto: CreateNewsCategoriesDto) { return this.commandBus.execute(new CreateNewsCategoriesCommand(dto)); }
  @Put('update/:id') @ApiOperation({summary: 'Update news category'}) @ApiParam({name: 'id', type: Number})
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateNewsCategoriesDto) { return this.commandBus.execute(new UpdateNewsCategoriesCommand({...dto, id})); }
  @Delete('delete') @ApiOperation({summary: 'Delete news category'}) @ApiBody({type: DeleteNewsCategoriesDto}) remove(@Body() dto: DeleteNewsCategoriesDto) { return this.commandBus.execute(new DeleteNewsCategoriesCommand(dto)); }
  @Get('detail/:id') @ApiOperation({summary: 'Get news category detail'}) @ApiParam({name: 'id', type: Number}) detail(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new DetailNewsCategoriesQuery({id})); }
  @Get('list') @ApiOperation({summary: 'Get news categories list'}) list(@Query() dto: ListNewsCategoriesDto) { return this.queryBus.execute(new ListNewsCategoriesQuery(dto)); }
}
