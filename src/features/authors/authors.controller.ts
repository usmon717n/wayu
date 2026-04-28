import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {ApiBody, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import {CreateAuthorsDto} from '../dto/authors/create-authors.dto';
import {UpdateAuthorsDto} from '../dto/authors/update-authors.dto';
import {DeleteAuthorsDto} from '../dto/authors/delete-authors.dto';
import {ListAuthorsDto} from '../dto/authors/list-authors.dto';
import {CreateAuthorsCommand, DeleteAuthorsCommand, DetailAuthorsQuery, ListAuthorsQuery, UpdateAuthorsCommand} from './authors.cqrs';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Post('create') @ApiOperation({summary: 'Create author'}) create(@Body() dto: CreateAuthorsDto) { return this.commandBus.execute(new CreateAuthorsCommand(dto)); }
  @Put('update/:id') @ApiOperation({summary: 'Update author'}) @ApiParam({name: 'id', type: Number})
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAuthorsDto) { return this.commandBus.execute(new UpdateAuthorsCommand({...dto, id})); }
  @Delete('delete') @ApiOperation({summary: 'Delete author'}) @ApiBody({type: DeleteAuthorsDto})
  remove(@Body() dto: DeleteAuthorsDto) { return this.commandBus.execute(new DeleteAuthorsCommand(dto)); }
  @Get('detail/:id') @ApiOperation({summary: 'Get author detail'}) @ApiParam({name: 'id', type: Number})
  detail(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new DetailAuthorsQuery({id})); }
  @Get('list') @ApiOperation({summary: 'Get authors list'}) list(@Query() dto: ListAuthorsDto) { return this.queryBus.execute(new ListAuthorsQuery(dto)); }
}
