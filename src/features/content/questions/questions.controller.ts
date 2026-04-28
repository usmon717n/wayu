import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateQuestionRequest} from "./commands/create-question/create-question.request";
import {CreateQuestionResponse} from "./commands/create-question/create-question.response";
import {DeleteQuestionCommand} from "./commands/delete-question/delete-question.command";
import {UpdateQuestionCommand} from "./commands/update-question/update-question.command";
import {UpdateQuestionRequest} from "./commands/update-question/update-question.request";
import {GetQuestionByIdQuery} from "./queries/get-question-by-id/get-question-by-id.query";
import {GetAllQuestionsFilters} from "./queries/get-all-questions/get-all-questions.filters";
import {GetAllQuestionsQuery} from "./queries/get-all-questions/get-all-questions.query";
import {GetAllQuestionsResponse} from "./queries/get-all-questions/get-all-questions.response";

@Controller('admin/questions')
export class QuestionsController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllQuestionsResponse]})
    async getAll(@Query() filters: GetAllQuestionsFilters) {
        return await this.queryBus.execute(new GetAllQuestionsQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: CreateQuestionResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetQuestionByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateQuestionResponse})
    async create(@Body() req: CreateQuestionRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Put(':id')
    @ApiOkResponse({type: CreateQuestionResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateQuestionRequest) {
        const cmd = new UpdateQuestionCommand();
        cmd.id = id;
        cmd.fullName = req.fullName;
        cmd.phoneNumber = req.phoneNumber;
        cmd.question = req.question;
        cmd.status = req.status;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteQuestionCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
