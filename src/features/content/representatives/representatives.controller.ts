import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {RepresentativeDto} from '@/features/content/representatives/representative.dto';
import {CreateRepresentativesCommand} from './commands/create-representatives/create-representatives.command';
import {UpdateRepresentativesCommand} from './commands/update-representatives/update-representatives.command';
import {DeleteRepresentativesCommand} from './commands/delete-representatives/delete-representatives.command';
import {GetRepresentativesByIdQuery} from './queries/get-representatives-by-id/get-representatives-by-id.query';
import {GetAllRepresentativesQuery} from './queries/get-all-representatives/get-all-representatives.query';
import {GetAllRepresentativesFilters} from './queries/get-all-representatives/get-all-representatives.filters';
@Controller('admin/representatives')
export class RepresentativesController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Get() @ApiOkResponse({type: [RepresentativeDto]}) async getAll(@Query() filters: GetAllRepresentativesFilters) { return this.queryBus.execute(new GetAllRepresentativesQuery(filters)); }
  @Get(':id') @ApiOkResponse({type: RepresentativeDto}) async getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetRepresentativesByIdQuery(id)); }
  @Post() @ApiCreatedResponse({type: RepresentativeDto}) async create(@Body() command: CreateRepresentativesCommand) { return this.commandBus.execute(command); }
  @Patch(':id') @ApiOkResponse({type: RepresentativeDto}) async update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateRepresentativesCommand) { command.id = id; return this.commandBus.execute(command); }
  @Delete(':id') async remove(@Param('id', ParseIntPipe) id: number) { const command = new DeleteRepresentativesCommand(); command.id = id; return this.commandBus.execute(command); }
}
