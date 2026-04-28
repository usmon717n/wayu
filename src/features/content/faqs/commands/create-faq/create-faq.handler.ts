import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {FaqsEntity} from "../../../../entities/faqs.entity";
import {CreateFaqCommand} from "./create-faq.command";
import {CreateFaqResponse} from "./create-faq.response";

@CommandHandler(CreateFaqCommand)
export class CreateFaqHandler implements ICommandHandler<CreateFaqCommand> {
    async execute(command: CreateFaqCommand): Promise<CreateFaqResponse> {
        const entity = FaqsEntity.create({question: command.question, answer: command.answer} as FaqsEntity);
        await FaqsEntity.save(entity);
        return plainToInstance(CreateFaqResponse, entity, {excludeExtraneousValues: true});
    }
}
