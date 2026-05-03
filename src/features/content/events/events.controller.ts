import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {EventDto} from '@/features/content/events/event.dto';
import {CreateEventsCommand} from './commands/create-events/create-events.command';
import {UpdateEventsCommand} from './commands/update-events/update-events.command';
import {DeleteEventsCommand} from './commands/delete-events/delete-events.command';
import {GetEventsByIdQuery} from './queries/get-events-by-id/get-events-by-id.query';
import {GetAllEventsQuery} from './queries/get-all-events/get-all-events.query';
import {GetAllEventsFilters} from './queries/get-all-events/get-all-events.filters';
@Controller('admin/events')
export class EventsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Get() @ApiOkResponse({type: [EventDto]}) async getAll(@Query() filters: GetAllEventsFilters) { return this.queryBus.execute(new GetAllEventsQuery(filters)); }
  @Get(':id') @ApiOkResponse({type: EventDto}) async getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetEventsByIdQuery(id)); }
  @Post() @ApiCreatedResponse({type: EventDto}) async create(@Body() command: CreateEventsCommand) { return this.commandBus.execute(command); }
  @Patch(':id') @ApiOkResponse({type: EventDto}) async update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateEventsCommand) { command.id = id; return this.commandBus.execute(command); }
  @Delete(':id') async remove(@Param('id', ParseIntPipe) id: number) { const command = new DeleteEventsCommand(); command.id = id; return this.commandBus.execute(command); }
}
