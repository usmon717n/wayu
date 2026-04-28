import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {FaqsEntity} from "../../../../entities/faqs.entity";
import {CreateFaqResponse} from "../create-faq/create-faq.response";
import {UpdateFaqCommand} from "./update-faq.command";

@CommandHandler(UpdateFaqCommand)
export class UpdateFaqHandler implements ICommandHandler<UpdateFaqCommand> {
    async execute(command: UpdateFaqCommand): Promise<CreateFaqResponse> {
        const entity = await FaqsEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("faq not found");

        entity.question = command.question;
        entity.answer = command.answer;
        await FaqsEntity.save(entity);

        return plainToInstance(CreateFaqResponse, entity, {excludeExtraneousValues: true});
    }
}
