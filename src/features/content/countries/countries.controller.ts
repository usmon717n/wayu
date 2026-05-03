import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {CountryDto} from '@/features/content/countries/country.dto';
import {CreateCountriesCommand} from './commands/create-countries/create-countries.command';
import {UpdateCountriesCommand} from './commands/update-countries/update-countries.command';
import {DeleteCountriesCommand} from './commands/delete-countries/delete-countries.command';
import {GetCountriesByIdQuery} from './queries/get-countries-by-id/get-countries-by-id.query';
import {GetAllCountriesQuery} from './queries/get-all-countries/get-all-countries.query';
import {GetAllCountriesFilters} from './queries/get-all-countries/get-all-countries.filters';

@Controller('admin/countries')
export class CountriesController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get() @ApiOkResponse({type: [CountryDto]})
  async getAll(@Query() filters: GetAllCountriesFilters) { return this.queryBus.execute(new GetAllCountriesQuery(filters)); }

  @Get(':id') @ApiOkResponse({type: CountryDto})
  async getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetCountriesByIdQuery(id)); }

  @Post() @ApiCreatedResponse({type: CountryDto})
  async create(@Body() command: CreateCountriesCommand) { return this.commandBus.execute(command); }

  @Patch(':id') @ApiOkResponse({type: CountryDto})
  async update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateCountriesCommand) {
    command.id = id;
    return this.commandBus.execute(command);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const command = new DeleteCountriesCommand();
    command.id = id;
    return this.commandBus.execute(command);
  }
}
