import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {CreateStaticInfoCommand} from '@/features/static-info/commands/create-static-info/create-static-info.command';
import {CreateStaticInfoResponse} from '@/features/static-info/commands/create-static-info/create-static-info.response';
import {UpdateStaticInfoCommand} from '@/features/static-info/commands/update-static-info/update-static-info.command';
import {UpdateStaticInfoResponse} from '@/features/static-info/commands/update-static-info/update-static-info.response';
import {DeleteStaticInfoCommand} from '@/features/static-info/commands/delete-static-info/delete-static-info.command';
import {GetStaticInfoQuery} from '@/features/static-info/queries/get-static-info/get-static-info.query';
import {GetStaticInfoResponse} from '@/features/static-info/queries/get-static-info/get-static-info.response';
import {GetAllStaticInfoQuery} from '@/features/static-info/queries/get-all-static-info/get-all-static-info.query';
import {GetAllStaticInfoResponse} from '@/features/static-info/queries/get-all-static-info/get-all-static-info.response';
import {GetAllStaticInfoFilters} from '@/features/static-info/queries/get-all-static-info/get-all-static-info.filters';

@Controller('admin/static-info')
export class StaticInfoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({type: [GetAllStaticInfoResponse]})
  async getAll(@Query() filters: GetAllStaticInfoFilters) {
    return await this.queryBus.execute(new GetAllStaticInfoQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({type: GetStaticInfoResponse})
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetStaticInfoQuery(id));
  }

  @Post()
  @ApiCreatedResponse({type: CreateStaticInfoResponse})
  async create(@Body() command: CreateStaticInfoCommand) {
    return await this.commandBus.execute(command);
  }

  @Patch(':id')
  @ApiOkResponse({type: UpdateStaticInfoResponse})
  async update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateStaticInfoCommand) {
    command.id = id;
    return await this.commandBus.execute(command);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const command = new DeleteStaticInfoCommand();
    command.id = id;
    return await this.commandBus.execute(command);
  }
}
