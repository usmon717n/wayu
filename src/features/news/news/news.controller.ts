import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiOkResponse} from "@nestjs/swagger";
import {CreateNewsResponse} from "./commands/create-news/create-news.response";
import {CreateNewsRequest} from "./commands/create-news/create-news.request";
import {CreateNewsCommand} from "./commands/create-news/create-news.command";
import {GetAllNewsFilters} from "./queries/get-all-news/get-all-news.filters";
import {GetAllNewsResponse} from "./queries/get-all-news/get-all-news.response";
import {GetAllNewsQuery} from "./queries/get-all-news/get-all-news.query";

@Controller('admin/news')
export class NewsController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queriesBus: QueryBus
    ) {
    }

    @Get()
    @ApiOkResponse({type: [GetAllNewsResponse]})
    async getAllNews(@Query() filters: GetAllNewsFilters){
        return await this.queriesBus.execute(new GetAllNewsQuery(filters))
    }


    @Post()
    @ApiOkResponse({type: CreateNewsResponse})
    async createNews(@Body() req: CreateNewsRequest){
        const cmd = new CreateNewsCommand()
        cmd.title = req.title
        return await this.commandBus.execute(cmd)
    }
}