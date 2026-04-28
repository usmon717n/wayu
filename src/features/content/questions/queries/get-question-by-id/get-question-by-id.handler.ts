import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {QuestionsEntity} from "../../../../entities/questions.entity";
import {CreateQuestionResponse} from "../../commands/create-question/create-question.response";
import {GetQuestionByIdQuery} from "./get-question-by-id.query";

@QueryHandler(GetQuestionByIdQuery)
export class GetQuestionByIdHandler implements IQueryHandler<GetQuestionByIdQuery> {
    async execute(query: GetQuestionByIdQuery): Promise<CreateQuestionResponse> {
        const entity = await QuestionsEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("question not found");
        return plainToInstance(CreateQuestionResponse, entity, {excludeExtraneousValues: true});
    }
}
