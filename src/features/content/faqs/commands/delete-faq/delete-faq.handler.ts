import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {FaqsEntity} from "../../../../entities/faqs.entity";
import {DeleteFaqCommand} from "./delete-faq.command";

@CommandHandler(DeleteFaqCommand)
export class DeleteFaqHandler implements ICommandHandler<DeleteFaqCommand> {
    async execute(command: DeleteFaqCommand): Promise<void> {
        const entity = await FaqsEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("faq not found");
        await FaqsEntity.remove(entity);
    }
}
