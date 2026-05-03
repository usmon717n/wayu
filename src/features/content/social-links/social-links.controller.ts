import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {SocialLinkDto} from '@/features/content/social-links/social-link.dto';
import {CreateSocialLinksCommand} from './commands/create-social-links/create-social-links.command';
import {UpdateSocialLinksCommand} from './commands/update-social-links/update-social-links.command';
import {DeleteSocialLinksCommand} from './commands/delete-social-links/delete-social-links.command';
import {GetSocialLinksByIdQuery} from './queries/get-social-links-by-id/get-social-links-by-id.query';
import {GetAllSocialLinksQuery} from './queries/get-all-social-links/get-all-social-links.query';
import {GetAllSocialLinksFilters} from './queries/get-all-social-links/get-all-social-links.filters';

@Controller('admin/social-links')
export class SocialLinksController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Get() @ApiOkResponse({type: [SocialLinkDto]}) async getAll(@Query() filters: GetAllSocialLinksFilters) { return this.queryBus.execute(new GetAllSocialLinksQuery(filters)); }
  @Get(':id') @ApiOkResponse({type: SocialLinkDto}) async getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetSocialLinksByIdQuery(id)); }
  @Post() @ApiCreatedResponse({type: SocialLinkDto}) async create(@Body() command: CreateSocialLinksCommand) { return this.commandBus.execute(command); }
  @Patch(':id') @ApiOkResponse({type: SocialLinkDto}) async update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateSocialLinksCommand) { command.id = id; return this.commandBus.execute(command); }
  @Delete(':id') async remove(@Param('id', ParseIntPipe) id: number) { const command = new DeleteSocialLinksCommand(); command.id = id; return this.commandBus.execute(command); }
}
