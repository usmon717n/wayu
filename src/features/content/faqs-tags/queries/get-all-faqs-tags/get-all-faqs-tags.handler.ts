import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {FaqsTagsEntity} from "../../../../entities/faqsTags.entity";
import {GetAllFaqsTagsQuery} from "./get-all-faqs-tags.query";
import {GetAllFaqsTagsResponse} from "./get-all-faqs-tags.response";

@QueryHandler(GetAllFaqsTagsQuery)
export class GetAllFaqsTagsHandler implements IQueryHandler<GetAllFaqsTagsQuery> {
    async execute(query: GetAllFaqsTagsQuery): Promise<GetAllFaqsTagsResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const list = await FaqsTagsEntity.find({skip, take});
        return plainToInstance(GetAllFaqsTagsResponse, list, {excludeExtraneousValues: true});
    }
}
