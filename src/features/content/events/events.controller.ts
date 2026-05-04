import {BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiConsumes, ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {EventDto} from '@/features/content/events/event.dto';
import {CreateEventsCommand} from './commands/create-events/create-events.command';
import {UpdateEventsCommand} from './commands/update-events/update-events.command';
import {DeleteEventsCommand} from './commands/delete-events/delete-events.command';
import {GetEventsByIdQuery} from './queries/get-events-by-id/get-events-by-id.query';
import {GetAllEventsQuery} from './queries/get-all-events/get-all-events.query';
import {GetAllEventsFilters} from './queries/get-all-events/get-all-events.filters';
import {FileInterceptor} from '@nestjs/platform-express';
import {storageOptions} from '@/configs/multer.config';
import fs from 'fs';
@Controller('admin/events')
export class EventsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Get() @ApiOkResponse({type: [EventDto]}) async getAll(@Query() filters: GetAllEventsFilters) { return this.queryBus.execute(new GetAllEventsQuery(filters)); }
  @Get(':id') @ApiOkResponse({type: EventDto}) async getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetEventsByIdQuery(id)); }
  @Post() @ApiCreatedResponse({type: EventDto}) @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', {storage: storageOptions, limits: {fileSize: 1024 * 1024 * 5}}))
  async create(@Body() command: CreateEventsCommand, @UploadedFile() image: Express.Multer.File) {
    if (!image) throw new BadRequestException('Image file is required');
    command.image = image.filename;

    try {
      return await this.commandBus.execute(command);
    } catch (error) {
      if (fs.existsSync(image.path)) fs.rmSync(image.path);
      throw error;
    }
  }
  @Patch(':id') @ApiOkResponse({type: EventDto}) async update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateEventsCommand) { command.id = id; return this.commandBus.execute(command); }
  @Delete(':id') async remove(@Param('id', ParseIntPipe) id: number) { const command = new DeleteEventsCommand(); command.id = id; return this.commandBus.execute(command); }
}
