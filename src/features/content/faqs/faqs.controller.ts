import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {FaqDto} from '@/features/content/faqs/faq.dto';
import {CreateFaqsCommand} from './commands/create-faqs/create-faqs.command';
import {UpdateFaqsCommand} from './commands/update-faqs/update-faqs.command';
import {DeleteFaqsCommand} from './commands/delete-faqs/delete-faqs.command';
import {GetFaqsByIdQuery} from './queries/get-faqs-by-id/get-faqs-by-id.query';
import {GetAllFaqsQuery} from './queries/get-all-faqs/get-all-faqs.query';
import {GetAllFaqsFilters} from './queries/get-all-faqs/get-all-faqs.filters';

@Controller('admin/faqs')
export class FaqsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get() @ApiOkResponse({type: [FaqDto]})
  async getAll(@Query() filters: GetAllFaqsFilters) { return this.queryBus.execute(new GetAllFaqsQuery(filters)); }

  @Get(':id') @ApiOkResponse({type: FaqDto})
  async getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetFaqsByIdQuery(id)); }

  @Post() @ApiCreatedResponse({type: FaqDto})
  async create(@Body() command: CreateFaqsCommand) { return this.commandBus.execute(command); }

  @Patch(':id') @ApiOkResponse({type: FaqDto})
  async update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateFaqsCommand) {
    command.id = id;
    return this.commandBus.execute(command);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const command = new DeleteFaqsCommand();
    command.id = id;
    return this.commandBus.execute(command);
  }
}
