import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {FaqsTagDto} from '@/features/content/faqs-tags/faqs-tag.dto';
import {CreateFaqsTagsCommand} from './commands/create-faqs-tags/create-faqs-tags.command';
import {DeleteFaqsTagsCommand} from './commands/delete-faqs-tags/delete-faqs-tags.command';
import {GetFaqsTagsByKeysQuery} from './queries/get-faqs-tags-by-keys/get-faqs-tags-by-keys.query';
import {GetAllFaqsTagsQuery} from './queries/get-all-faqs-tags/get-all-faqs-tags.query';
import {GetAllFaqsTagsFilters} from './queries/get-all-faqs-tags/get-all-faqs-tags.filters';

@Controller('admin/faqs-tags')
export class FaqsTagsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get() @ApiOkResponse({type: [FaqsTagDto]})
  async getAll(@Query() filters: GetAllFaqsTagsFilters) { return this.queryBus.execute(new GetAllFaqsTagsQuery(filters)); }

  @Get(':faqsId/:tagId') @ApiOkResponse({type: FaqsTagDto})
  async getByKeys(@Param('faqsId', ParseIntPipe) faqsId: number, @Param('tagId', ParseIntPipe) tagId: number) {
    return this.queryBus.execute(new GetFaqsTagsByKeysQuery(faqsId, tagId));
  }

  @Post() @ApiCreatedResponse({type: FaqsTagDto})
  async create(@Body() command: CreateFaqsTagsCommand) { return this.commandBus.execute(command); }

  @Delete(':faqsId/:tagId')
  async remove(@Param('faqsId', ParseIntPipe) faqsId: number, @Param('tagId', ParseIntPipe) tagId: number) {
    const command = new DeleteFaqsTagsCommand();
    command.faqsId = faqsId;
    command.tagId = tagId;
    return this.commandBus.execute(command);
  }
}
