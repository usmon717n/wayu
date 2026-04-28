import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {ApiBody, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import {CreateEventCategoriesDto} from '../dto/event-categories/create-event-categories.dto';
import {UpdateEventCategoriesDto} from '../dto/event-categories/update-event-categories.dto';
import {DeleteEventCategoriesDto} from '../dto/event-categories/delete-event-categories.dto';
import {ListEventCategoriesDto} from '../dto/event-categories/list-event-categories.dto';
import {CreateEventCategoriesCommand, DeleteEventCategoriesCommand, DetailEventCategoriesQuery, ListEventCategoriesQuery, UpdateEventCategoriesCommand} from './event-categories.cqrs';

@ApiTags('Event Categories')
@Controller('event-categories')
export class EventCategoriesController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Post('create') @ApiOperation({summary: 'Create event category'}) create(@Body() dto: CreateEventCategoriesDto) { return this.commandBus.execute(new CreateEventCategoriesCommand(dto)); }
  @Put('update/:id') @ApiOperation({summary: 'Update event category'}) @ApiParam({name: 'id', type: Number})
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEventCategoriesDto) { return this.commandBus.execute(new UpdateEventCategoriesCommand({...dto, id})); }
  @Delete('delete') @ApiOperation({summary: 'Delete event category'}) @ApiBody({type: DeleteEventCategoriesDto}) remove(@Body() dto: DeleteEventCategoriesDto) { return this.commandBus.execute(new DeleteEventCategoriesCommand(dto)); }
  @Get('detail/:id') @ApiOperation({summary: 'Get event category detail'}) @ApiParam({name: 'id', type: Number}) detail(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new DetailEventCategoriesQuery({id})); }
  @Get('list') @ApiOperation({summary: 'Get event categories list'}) list(@Query() dto: ListEventCategoriesDto) { return this.queryBus.execute(new ListEventCategoriesQuery(dto)); }
}
