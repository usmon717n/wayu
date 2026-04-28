import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {FaqsTagsEntity} from "../../../../entities/faqsTags.entity";
import {CreateFaqsTagResponse} from "../create-faqs-tag/create-faqs-tag.response";
import {UpdateFaqsTagCommand} from "./update-faqs-tag.command";

@CommandHandler(UpdateFaqsTagCommand)
export class UpdateFaqsTagHandler implements ICommandHandler<UpdateFaqsTagCommand> {
    async execute(command: UpdateFaqsTagCommand): Promise<CreateFaqsTagResponse> {
        const entity = await FaqsTagsEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("faqs tag relation not found");

        entity.faqsId = command.faqsId;
        entity.tagId = command.tagId;
        await FaqsTagsEntity.save(entity);

        return plainToInstance(CreateFaqsTagResponse, entity, {excludeExtraneousValues: true});
    }
}
