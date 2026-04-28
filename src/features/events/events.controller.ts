import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {ApiBody, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import {CreateEventsDto} from '../dto/events/create-events.dto';
import {UpdateEventsDto} from '../dto/events/update-events.dto';
import {DeleteEventsDto} from '../dto/events/delete-events.dto';
import {ListEventsDto} from '../dto/events/list-events.dto';
import {CreateEventsCommand, DeleteEventsCommand, DetailEventsQuery, ListEventsQuery, UpdateEventsCommand} from './events.cqrs';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Post('create') @ApiOperation({summary: 'Create event'}) create(@Body() dto: CreateEventsDto) { return this.commandBus.execute(new CreateEventsCommand(dto)); }
  @Put('update/:id') @ApiOperation({summary: 'Update event'}) @ApiParam({name: 'id', type: Number})
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEventsDto) { return this.commandBus.execute(new UpdateEventsCommand({...dto, id})); }
  @Delete('delete') @ApiOperation({summary: 'Delete event'}) @ApiBody({type: DeleteEventsDto}) remove(@Body() dto: DeleteEventsDto) { return this.commandBus.execute(new DeleteEventsCommand(dto)); }
  @Get('detail/:id') @ApiOperation({summary: 'Get event detail'}) @ApiParam({name: 'id', type: Number}) detail(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new DetailEventsQuery({id})); }
  @Get('list') @ApiOperation({summary: 'Get events list'}) list(@Query() dto: ListEventsDto) { return this.queryBus.execute(new ListEventsQuery(dto)); }
}
