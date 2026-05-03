import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {VacancyDto} from '@/features/content/vacancies/vacancy.dto';
import {
  CreateVacancyCommand, DeleteVacancyCommand, GetAllVacanciesFilters, GetAllVacanciesQuery,
  GetVacancyByIdQuery, UpdateVacancyCommand,
} from '@/features/content/vacancies/vacancy.cqrs';

@Controller('admin/vacancies')
export class VacanciesController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Get() @ApiOkResponse({type: [VacancyDto]}) getAll(@Query() filters: GetAllVacanciesFilters) { return this.queryBus.execute(new GetAllVacanciesQuery(filters)); }
  @Get(':id') @ApiOkResponse({type: VacancyDto}) getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetVacancyByIdQuery(id)); }
  @Post() @ApiCreatedResponse({type: VacancyDto}) create(@Body() command: CreateVacancyCommand) { return this.commandBus.execute(command); }
  @Patch(':id') @ApiOkResponse({type: VacancyDto}) update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateVacancyCommand) { command.id = id; return this.commandBus.execute(command); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.commandBus.execute(new DeleteVacancyCommand(id)); }
}
