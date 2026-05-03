import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {UsefulLinkDto} from '@/features/content/useful-links/useful-link.dto';
import {CreateUsefulLinksCommand} from './commands/create-useful-links/create-useful-links.command';
import {UpdateUsefulLinksCommand} from './commands/update-useful-links/update-useful-links.command';
import {DeleteUsefulLinksCommand} from './commands/delete-useful-links/delete-useful-links.command';
import {GetUsefulLinksByIdQuery} from './queries/get-useful-links-by-id/get-useful-links-by-id.query';
import {GetAllUsefulLinksQuery} from './queries/get-all-useful-links/get-all-useful-links.query';
import {GetAllUsefulLinksFilters} from './queries/get-all-useful-links/get-all-useful-links.filters';
@Controller('admin/useful-links')
export class UsefulLinksController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Get() @ApiOkResponse({type: [UsefulLinkDto]}) async getAll(@Query() filters: GetAllUsefulLinksFilters) { return this.queryBus.execute(new GetAllUsefulLinksQuery(filters)); }
  @Get(':id') @ApiOkResponse({type: UsefulLinkDto}) async getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetUsefulLinksByIdQuery(id)); }
  @Post() @ApiCreatedResponse({type: UsefulLinkDto}) async create(@Body() command: CreateUsefulLinksCommand) { return this.commandBus.execute(command); }
  @Patch(':id') @ApiOkResponse({type: UsefulLinkDto}) async update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateUsefulLinksCommand) { command.id = id; return this.commandBus.execute(command); }
  @Delete(':id') async remove(@Param('id', ParseIntPipe) id: number) { const command = new DeleteUsefulLinksCommand(); command.id = id; return this.commandBus.execute(command); }
}
