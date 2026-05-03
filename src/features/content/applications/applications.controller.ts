import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {ApplicationDto} from '@/features/content/applications/application.dto';
import {
  CreateApplicationCommand, DeleteApplicationCommand, GetAllApplicationsFilters, GetAllApplicationsQuery,
  GetApplicationByIdQuery, UpdateApplicationCommand,
} from '@/features/content/applications/application.cqrs';

@Controller('admin/applications')
export class ApplicationsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Get() @ApiOkResponse({type: [ApplicationDto]}) getAll(@Query() filters: GetAllApplicationsFilters) { return this.queryBus.execute(new GetAllApplicationsQuery(filters)); }
  @Get(':id') @ApiOkResponse({type: ApplicationDto}) getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetApplicationByIdQuery(id)); }
  @Post() @ApiCreatedResponse({type: ApplicationDto}) create(@Body() command: CreateApplicationCommand) { return this.commandBus.execute(command); }
  @Patch(':id') @ApiOkResponse({type: ApplicationDto}) update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateApplicationCommand) { command.id = id; return this.commandBus.execute(command); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.commandBus.execute(new DeleteApplicationCommand(id)); }
}
