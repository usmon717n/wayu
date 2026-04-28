import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateFaqsTagRequest} from "./commands/create-faqs-tag/create-faqs-tag.request";
import {CreateFaqsTagResponse} from "./commands/create-faqs-tag/create-faqs-tag.response";
import {DeleteFaqsTagCommand} from "./commands/delete-faqs-tag/delete-faqs-tag.command";
import {UpdateFaqsTagCommand} from "./commands/update-faqs-tag/update-faqs-tag.command";
import {UpdateFaqsTagRequest} from "./commands/update-faqs-tag/update-faqs-tag.request";
import {GetFaqsTagByIdQuery} from "./queries/get-faqs-tag-by-id/get-faqs-tag-by-id.query";
import {GetAllFaqsTagsFilters} from "./queries/get-all-faqs-tags/get-all-faqs-tags.filters";
import {GetAllFaqsTagsQuery} from "./queries/get-all-faqs-tags/get-all-faqs-tags.query";
import {GetAllFaqsTagsResponse} from "./queries/get-all-faqs-tags/get-all-faqs-tags.response";

@Controller('admin/faqs-tags')
export class FaqsTagsController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllFaqsTagsResponse]})
    async getAll(@Query() filters: GetAllFaqsTagsFilters) {
        return await this.queryBus.execute(new GetAllFaqsTagsQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: CreateFaqsTagResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetFaqsTagByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateFaqsTagResponse})
    async create(@Body() req: CreateFaqsTagRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Put(':id')
    @ApiOkResponse({type: CreateFaqsTagResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateFaqsTagRequest) {
        const cmd = new UpdateFaqsTagCommand();
        cmd.id = id;
        cmd.faqsId = req.faqsId;
        cmd.tagId = req.tagId;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteFaqsTagCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
