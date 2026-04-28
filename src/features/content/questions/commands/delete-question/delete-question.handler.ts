import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {QuestionsEntity} from "../../../../entities/questions.entity";
import {DeleteQuestionCommand} from "./delete-question.command";

@CommandHandler(DeleteQuestionCommand)
export class DeleteQuestionHandler implements ICommandHandler<DeleteQuestionCommand> {
    async execute(command: DeleteQuestionCommand): Promise<void> {
        const entity = await QuestionsEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("question not found");
        await QuestionsEntity.remove(entity);
    }
}
