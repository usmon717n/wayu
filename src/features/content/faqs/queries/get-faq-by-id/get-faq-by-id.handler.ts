import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {FaqsEntity} from "../../../../entities/faqs.entity";
import {CreateFaqResponse} from "../../commands/create-faq/create-faq.response";
import {GetFaqByIdQuery} from "./get-faq-by-id.query";

@QueryHandler(GetFaqByIdQuery)
export class GetFaqByIdHandler implements IQueryHandler<GetFaqByIdQuery> {
    async execute(query: GetFaqByIdQuery): Promise<CreateFaqResponse> {
        const entity = await FaqsEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("faq not found");
        return plainToInstance(CreateFaqResponse, entity, {excludeExtraneousValues: true});
    }
}
