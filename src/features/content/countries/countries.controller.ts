import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateCountryRequest} from "./commands/create-country/create-country.request";
import {CreateCountryResponse} from "./commands/create-country/create-country.response";
import {DeleteCountryCommand} from "./commands/delete-country/delete-country.command";
import {UpdateCountryCommand} from "./commands/update-country/update-country.command";
import {UpdateCountryRequest} from "./commands/update-country/update-country.request";
import {GetCountryByIdQuery} from "./queries/get-country-by-id/get-country-by-id.query";
import {GetAllCountriesFilters} from "./queries/get-all-countries/get-all-countries.filters";
import {GetAllCountriesQuery} from "./queries/get-all-countries/get-all-countries.query";
import {GetAllCountriesResponse} from "./queries/get-all-countries/get-all-countries.response";

@Controller('admin/countries')
export class CountriesController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllCountriesResponse]})
    async getAll(@Query() filters: GetAllCountriesFilters) {
        return await this.queryBus.execute(new GetAllCountriesQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: CreateCountryResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetCountryByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateCountryResponse})
    async create(@Body() req: CreateCountryRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Put(':id')
    @ApiOkResponse({type: CreateCountryResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateCountryRequest) {
        const cmd = new UpdateCountryCommand();
        cmd.id = id;
        cmd.title = req.title;
        cmd.flag = req.flag;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteCountryCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
