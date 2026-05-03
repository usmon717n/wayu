import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {NewsTagDto} from '@/features/content/news-tags/news-tag.dto';
import {CreateNewsTagsCommand} from './commands/create-news-tags/create-news-tags.command';
import {DeleteNewsTagsCommand} from './commands/delete-news-tags/delete-news-tags.command';
import {GetAllNewsTagsQuery} from './queries/get-all-news-tags/get-all-news-tags.query';
import {GetAllNewsTagsFilters} from './queries/get-all-news-tags/get-all-news-tags.filters';
import {GetNewsTagsByKeysQuery} from './queries/get-news-tags-by-keys/get-news-tags-by-keys.query';
@Controller('admin/news-tags')
export class NewsTagsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Get() @ApiOkResponse({type: [NewsTagDto]}) async getAll(@Query() filters: GetAllNewsTagsFilters) { return this.queryBus.execute(new GetAllNewsTagsQuery(filters)); }
  @Get(':newsId/:tagId') @ApiOkResponse({type: NewsTagDto}) async getByKeys(@Param('newsId', ParseIntPipe) newsId: number, @Param('tagId', ParseIntPipe) tagId: number) { return this.queryBus.execute(new GetNewsTagsByKeysQuery(newsId, tagId)); }
  @Post() @ApiCreatedResponse({type: NewsTagDto}) async create(@Body() command: CreateNewsTagsCommand) { return this.commandBus.execute(command); }
  @Delete(':newsId/:tagId') async remove(@Param('newsId', ParseIntPipe) newsId: number, @Param('tagId', ParseIntPipe) tagId: number) { const command = new DeleteNewsTagsCommand(); command.newsId = newsId; command.tagId = tagId; return this.commandBus.execute(command); }
}
