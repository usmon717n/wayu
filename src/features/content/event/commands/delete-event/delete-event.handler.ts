import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {EventEntity} from "../../../../entities/event.entity";
import {DeleteEventCommand} from "./delete-event.command";

@CommandHandler(DeleteEventCommand)
export class DeleteEventHandler implements ICommandHandler<DeleteEventCommand> {
    async execute(command: DeleteEventCommand): Promise<void> {
        const entity = await EventEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("event not found");
        await EventEntity.remove(entity);
    }
}
