import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {FaqsTagsEntity} from "../../../../entities/faqsTags.entity";
import {CreateFaqsTagResponse} from "../../commands/create-faqs-tag/create-faqs-tag.response";
import {GetFaqsTagByIdQuery} from "./get-faqs-tag-by-id.query";

@QueryHandler(GetFaqsTagByIdQuery)
export class GetFaqsTagByIdHandler implements IQueryHandler<GetFaqsTagByIdQuery> {
    async execute(query: GetFaqsTagByIdQuery): Promise<CreateFaqsTagResponse> {
        const entity = await FaqsTagsEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("faqs tag relation not found");
        return plainToInstance(CreateFaqsTagResponse, entity, {excludeExtraneousValues: true});
    }
}
