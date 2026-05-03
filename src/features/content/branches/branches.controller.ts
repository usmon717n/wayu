import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {BranchDto} from '@/features/content/branches/branch.dto';
import {CreateBranchesCommand} from './commands/create-branches/create-branches.command';
import {UpdateBranchesCommand} from './commands/update-branches/update-branches.command';
import {DeleteBranchesCommand} from './commands/delete-branches/delete-branches.command';
import {GetBranchesByIdQuery} from './queries/get-branches-by-id/get-branches-by-id.query';
import {GetAllBranchesQuery} from './queries/get-all-branches/get-all-branches.query';
import {GetAllBranchesFilters} from './queries/get-all-branches/get-all-branches.filters';
@Controller('admin/branches')
export class BranchesController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Get() @ApiOkResponse({type: [BranchDto]}) async getAll(@Query() filters: GetAllBranchesFilters) { return this.queryBus.execute(new GetAllBranchesQuery(filters)); }
  @Get(':id') @ApiOkResponse({type: BranchDto}) async getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetBranchesByIdQuery(id)); }
  @Post() @ApiCreatedResponse({type: BranchDto}) async create(@Body() command: CreateBranchesCommand) { return this.commandBus.execute(command); }
  @Patch(':id') @ApiOkResponse({type: BranchDto}) async update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateBranchesCommand) { command.id = id; return this.commandBus.execute(command); }
  @Delete(':id') async remove(@Param('id', ParseIntPipe) id: number) { const command = new DeleteBranchesCommand(); command.id = id; return this.commandBus.execute(command); }
}
