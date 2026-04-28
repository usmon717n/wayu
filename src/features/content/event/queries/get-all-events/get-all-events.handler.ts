import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {EventEntity} from "../../../../entities/event.entity";
import {GetAllEventsQuery} from "./get-all-events.query";
import {GetAllEventsResponse} from "./get-all-events.response";

@QueryHandler(GetAllEventsQuery)
export class GetAllEventsHandler implements IQueryHandler<GetAllEventsQuery> {
    async execute(query: GetAllEventsQuery): Promise<GetAllEventsResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const list = await EventEntity.find({skip, take});
        return plainToInstance(GetAllEventsResponse, list, {excludeExtraneousValues: true});
    }
}
