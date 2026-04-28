import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {EventEntity} from "../../../../entities/event.entity";
import {CreateEventResponse} from "../../commands/create-event/create-event.response";
import {GetEventByIdQuery} from "./get-event-by-id.query";

@QueryHandler(GetEventByIdQuery)
export class GetEventByIdHandler implements IQueryHandler<GetEventByIdQuery> {
    async execute(query: GetEventByIdQuery): Promise<CreateEventResponse> {
        const entity = await EventEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("event not found");
        return plainToInstance(CreateEventResponse, entity, {excludeExtraneousValues: true});
    }
}
