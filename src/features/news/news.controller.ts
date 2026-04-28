import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {ApiBody, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import {CreateNewsDto} from '../dto/news/create-news.dto';
import {UpdateNewsDto} from '../dto/news/update-news.dto';
import {DeleteNewsDto} from '../dto/news/delete-news.dto';
import {ListNewsDto} from '../dto/news/list-news.dto';
import {CreateNewsCommand, DeleteNewsCommand, DetailNewsQuery, ListNewsQuery, UpdateNewsCommand} from './news.cqrs';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Post('create') @ApiOperation({summary: 'Create news'}) create(@Body() dto: CreateNewsDto) { return this.commandBus.execute(new CreateNewsCommand(dto)); }
  @Put('update/:id') @ApiOperation({summary: 'Update news'}) @ApiParam({name: 'id', type: Number})
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateNewsDto) { return this.commandBus.execute(new UpdateNewsCommand({...dto, id})); }
  @Delete('delete') @ApiOperation({summary: 'Delete news'}) @ApiBody({type: DeleteNewsDto}) remove(@Body() dto: DeleteNewsDto) { return this.commandBus.execute(new DeleteNewsCommand(dto)); }
  @Get('detail/:id') @ApiOperation({summary: 'Get news detail'}) @ApiParam({name: 'id', type: Number}) detail(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new DetailNewsQuery({id})); }
  @Get('list') @ApiOperation({summary: 'Get news list'}) list(@Query() dto: ListNewsDto) { return this.queryBus.execute(new ListNewsQuery(dto)); }
}
