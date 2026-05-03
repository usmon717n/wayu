import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {AuthorDto} from '@/features/content/authors/author.dto';
import {CreateAuthorCommand, DeleteAuthorCommand, GetAllAuthorsFilters, GetAllAuthorsQuery, GetAuthorByIdQuery, UpdateAuthorCommand} from '@/features/content/authors/author.cqrs';

@Controller('admin/authors')
export class AuthorsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Get() @ApiOkResponse({type: [AuthorDto]}) getAll(@Query() filters: GetAllAuthorsFilters) { return this.queryBus.execute(new GetAllAuthorsQuery(filters)); }
  @Get(':id') @ApiOkResponse({type: AuthorDto}) getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetAuthorByIdQuery(id)); }
  @Post() @ApiCreatedResponse({type: AuthorDto}) create(@Body() command: CreateAuthorCommand) { return this.commandBus.execute(command); }
  @Patch(':id') @ApiOkResponse({type: AuthorDto}) update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateAuthorCommand) { command.id = id; return this.commandBus.execute(command); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.commandBus.execute(new DeleteAuthorCommand(id)); }
}
