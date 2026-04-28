import {BadRequestException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {EventCategoriesEntity} from "../../../../entities/eventCategories.entity";
import {EventEntity} from "../../../../entities/event.entity";
import {CreateEventCommand} from "./create-event.command";
import {CreateEventResponse} from "./create-event.response";

@CommandHandler(CreateEventCommand)
export class CreateEventHandler implements ICommandHandler<CreateEventCommand> {
    async execute(command: CreateEventCommand): Promise<CreateEventResponse> {
        const categoryExists = await EventCategoriesEntity.existsBy({id: command.eventcategoryId});
        if (!categoryExists) {
            throw new BadRequestException("event category not found");
        }

        const entity = EventEntity.create({
            title: command.title,
            content: command.content,
            image: command.image,
            date: command.date,
            address: command.address,
            category: {id: command.eventcategoryId} as EventCategoriesEntity,
        } as EventEntity);
        await EventEntity.save(entity);
        return plainToInstance(CreateEventResponse, entity, {excludeExtraneousValues: true});
    }
}
