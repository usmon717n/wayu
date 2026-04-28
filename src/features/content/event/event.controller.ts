import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateEventRequest} from "./commands/create-event/create-event.request";
import {CreateEventResponse} from "./commands/create-event/create-event.response";
import {DeleteEventCommand} from "./commands/delete-event/delete-event.command";
import {UpdateEventCommand} from "./commands/update-event/update-event.command";
import {UpdateEventRequest} from "./commands/update-event/update-event.request";
import {GetEventByIdQuery} from "./queries/get-event-by-id/get-event-by-id.query";
import {GetAllEventsFilters} from "./queries/get-all-events/get-all-events.filters";
import {GetAllEventsQuery} from "./queries/get-all-events/get-all-events.query";
import {GetAllEventsResponse} from "./queries/get-all-events/get-all-events.response";

@Controller('admin/event')
export class EventController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllEventsResponse]})
    async getAll(@Query() filters: GetAllEventsFilters) {
        return await this.queryBus.execute(new GetAllEventsQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: CreateEventResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetEventByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateEventResponse})
    async create(@Body() req: CreateEventRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Put(':id')
    @ApiOkResponse({type: CreateEventResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateEventRequest) {
        const cmd = new UpdateEventCommand();
        cmd.id = id;
        cmd.title = req.title;
        cmd.content = req.content;
        cmd.image = req.image;
        cmd.date = new Date(req.date);
        cmd.address = req.address;
        cmd.eventcategoryId = req.eventcategoryId;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteEventCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
