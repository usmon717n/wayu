import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {QuestionsEntity} from "../../../../entities/questions.entity";
import {GetAllQuestionsQuery} from "./get-all-questions.query";
import {GetAllQuestionsResponse} from "./get-all-questions.response";

@QueryHandler(GetAllQuestionsQuery)
export class GetAllQuestionsHandler implements IQueryHandler<GetAllQuestionsQuery> {
    async execute(query: GetAllQuestionsQuery): Promise<GetAllQuestionsResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const list = await QuestionsEntity.find({skip, take});
        return plainToInstance(GetAllQuestionsResponse, list, {excludeExtraneousValues: true});
    }
}
