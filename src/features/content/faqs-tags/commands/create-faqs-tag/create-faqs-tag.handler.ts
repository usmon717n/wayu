import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {FaqsTagsEntity} from "../../../../entities/faqsTags.entity";
import {CreateFaqsTagCommand} from "./create-faqs-tag.command";
import {CreateFaqsTagResponse} from "./create-faqs-tag.response";

@CommandHandler(CreateFaqsTagCommand)
export class CreateFaqsTagHandler implements ICommandHandler<CreateFaqsTagCommand> {
    async execute(command: CreateFaqsTagCommand): Promise<CreateFaqsTagResponse> {
        const entity = FaqsTagsEntity.create({faqsId: command.faqsId, tagId: command.tagId} as FaqsTagsEntity);
        await FaqsTagsEntity.save(entity);
        return plainToInstance(CreateFaqsTagResponse, entity, {excludeExtraneousValues: true});
    }
}
