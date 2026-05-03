import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {EventCategoryDto} from '@/features/content/event-categories/event-category.dto';
import {CreateEventCategoriesCommand} from './commands/create-event-categories/create-event-categories.command';
import {UpdateEventCategoriesCommand} from './commands/update-event-categories/update-event-categories.command';
import {DeleteEventCategoriesCommand} from './commands/delete-event-categories/delete-event-categories.command';
import {GetEventCategoriesByIdQuery} from './queries/get-event-categories-by-id/get-event-categories-by-id.query';
import {GetAllEventCategoriesQuery} from './queries/get-all-event-categories/get-all-event-categories.query';
import {GetAllEventCategoriesFilters} from './queries/get-all-event-categories/get-all-event-categories.filters';
@Controller('admin/event-categories')
export class EventCategoriesController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Get() @ApiOkResponse({type: [EventCategoryDto]}) async getAll(@Query() filters: GetAllEventCategoriesFilters) { return this.queryBus.execute(new GetAllEventCategoriesQuery(filters)); }
  @Get(':id') @ApiOkResponse({type: EventCategoryDto}) async getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetEventCategoriesByIdQuery(id)); }
  @Post() @ApiCreatedResponse({type: EventCategoryDto}) async create(@Body() command: CreateEventCategoriesCommand) { return this.commandBus.execute(command); }
  @Patch(':id') @ApiOkResponse({type: EventCategoryDto}) async update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateEventCategoriesCommand) { command.id = id; return this.commandBus.execute(command); }
  @Delete(':id') async remove(@Param('id', ParseIntPipe) id: number) { const command = new DeleteEventCategoriesCommand(); command.id = id; return this.commandBus.execute(command); }
}
