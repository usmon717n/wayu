import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {TagDto} from '@/features/content/tags/tag.dto';
import {CreateTagsCommand} from './commands/create-tags/create-tags.command';
import {UpdateTagsCommand} from './commands/update-tags/update-tags.command';
import {DeleteTagsCommand} from './commands/delete-tags/delete-tags.command';
import {GetTagsByIdQuery} from './queries/get-tags-by-id/get-tags-by-id.query';
import {GetAllTagsQuery} from './queries/get-all-tags/get-all-tags.query';
import {GetAllTagsFilters} from './queries/get-all-tags/get-all-tags.filters';
@Controller('admin/tags')
export class TagsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Get() @ApiOkResponse({type: [TagDto]}) async getAll(@Query() filters: GetAllTagsFilters) { return this.queryBus.execute(new GetAllTagsQuery(filters)); }
  @Get(':id') @ApiOkResponse({type: TagDto}) async getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetTagsByIdQuery(id)); }
  @Post() @ApiCreatedResponse({type: TagDto}) async create(@Body() command: CreateTagsCommand) { return this.commandBus.execute(command); }
  @Patch(':id') @ApiOkResponse({type: TagDto}) async update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateTagsCommand) { command.id = id; return this.commandBus.execute(command); }
  @Delete(':id') async remove(@Param('id', ParseIntPipe) id: number) { const command = new DeleteTagsCommand(); command.id = id; return this.commandBus.execute(command); }
}
