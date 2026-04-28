import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {FaqsTagsEntity} from "../../../../entities/faqsTags.entity";
import {DeleteFaqsTagCommand} from "./delete-faqs-tag.command";

@CommandHandler(DeleteFaqsTagCommand)
export class DeleteFaqsTagHandler implements ICommandHandler<DeleteFaqsTagCommand> {
    async execute(command: DeleteFaqsTagCommand): Promise<void> {
        const entity = await FaqsTagsEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("faqs tag relation not found");
        await FaqsTagsEntity.remove(entity);
    }
}
