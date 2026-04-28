import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {QuestionsEntity} from "../../../../entities/questions.entity";
import {CreateQuestionResponse} from "../create-question/create-question.response";
import {UpdateQuestionCommand} from "./update-question.command";

@CommandHandler(UpdateQuestionCommand)
export class UpdateQuestionHandler implements ICommandHandler<UpdateQuestionCommand> {
    async execute(command: UpdateQuestionCommand): Promise<CreateQuestionResponse> {
        const entity = await QuestionsEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("question not found");

        entity.fullName = command.fullName;
        entity.phoneNumber = command.phoneNumber;
        entity.question = command.question;
        entity.status = command.status;
        await QuestionsEntity.save(entity);

        return plainToInstance(CreateQuestionResponse, entity, {excludeExtraneousValues: true});
    }
}
