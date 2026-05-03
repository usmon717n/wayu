import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {QuestionDto} from '@/features/content/questions/question.dto';
import {
  CreateQuestionCommand, DeleteQuestionCommand, GetAllQuestionsFilters, GetAllQuestionsQuery,
  GetQuestionByIdQuery, UpdateQuestionCommand,
} from '@/features/content/questions/question.cqrs';

@Controller('admin/questions')
export class QuestionsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get() @ApiOkResponse({type: [QuestionDto]})
  getAll(@Query() filters: GetAllQuestionsFilters) { return this.queryBus.execute(new GetAllQuestionsQuery(filters)); }

  @Get(':id') @ApiOkResponse({type: QuestionDto})
  getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetQuestionByIdQuery(id)); }

  @Post() @ApiCreatedResponse({type: QuestionDto})
  create(@Body() command: CreateQuestionCommand) { return this.commandBus.execute(command); }

  @Patch(':id') @ApiOkResponse({type: QuestionDto})
  update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateQuestionCommand) {
    command.id = id;
    return this.commandBus.execute(command);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.commandBus.execute(new DeleteQuestionCommand(id)); }
}
