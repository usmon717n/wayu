import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {LanguageDto} from '@/features/content/languages/language.dto';
import {CreateLanguageCommand, DeleteLanguageCommand, GetAllLanguagesFilters, GetAllLanguagesQuery, GetLanguageByIdQuery, UpdateLanguageCommand} from '@/features/content/languages/language.cqrs';

@Controller('admin/languages')
export class LanguagesController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Get() @ApiOkResponse({type: [LanguageDto]}) getAll(@Query() filters: GetAllLanguagesFilters) { return this.queryBus.execute(new GetAllLanguagesQuery(filters)); }
  @Get(':id') @ApiOkResponse({type: LanguageDto}) getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetLanguageByIdQuery(id)); }
  @Post() @ApiCreatedResponse({type: LanguageDto}) create(@Body() command: CreateLanguageCommand) { return this.commandBus.execute(command); }
  @Patch(':id') @ApiOkResponse({type: LanguageDto}) update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateLanguageCommand) { command.id = id; return this.commandBus.execute(command); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.commandBus.execute(new DeleteLanguageCommand(id)); }
}
