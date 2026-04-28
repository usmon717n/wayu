import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateFaqRequest} from "./commands/create-faq/create-faq.request";
import {CreateFaqResponse} from "./commands/create-faq/create-faq.response";
import {DeleteFaqCommand} from "./commands/delete-faq/delete-faq.command";
import {UpdateFaqCommand} from "./commands/update-faq/update-faq.command";
import {UpdateFaqRequest} from "./commands/update-faq/update-faq.request";
import {GetFaqByIdQuery} from "./queries/get-faq-by-id/get-faq-by-id.query";
import {GetAllFaqsFilters} from "./queries/get-all-faqs/get-all-faqs.filters";
import {GetAllFaqsQuery} from "./queries/get-all-faqs/get-all-faqs.query";
import {GetAllFaqsResponse} from "./queries/get-all-faqs/get-all-faqs.response";

@Controller('admin/faqs')
export class FaqsController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllFaqsResponse]})
    async getAll(@Query() filters: GetAllFaqsFilters) {
        return await this.queryBus.execute(new GetAllFaqsQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: CreateFaqResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetFaqByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateFaqResponse})
    async create(@Body() req: CreateFaqRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Put(':id')
    @ApiOkResponse({type: CreateFaqResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateFaqRequest) {
        const cmd = new UpdateFaqCommand();
        cmd.id = id;
        cmd.question = req.question;
        cmd.answer = req.answer;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteFaqCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
