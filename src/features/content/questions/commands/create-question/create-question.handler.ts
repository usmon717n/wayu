import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {QuestionsEntity} from "../../../../entities/questions.entity";
import {CreateQuestionCommand} from "./create-question.command";
import {CreateQuestionResponse} from "./create-question.response";

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionHandler implements ICommandHandler<CreateQuestionCommand> {
    async execute(command: CreateQuestionCommand): Promise<CreateQuestionResponse> {
        const entity = QuestionsEntity.create({
            fullName: command.fullName,
            phoneNumber: command.phoneNumber,
            question: command.question,
            status: command.status,
        } as QuestionsEntity);
        await QuestionsEntity.save(entity);
        return plainToInstance(CreateQuestionResponse, entity, {excludeExtraneousValues: true});
    }
}
