import {BadRequestException, NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {EventCategoriesEntity} from "../../../../entities/eventCategories.entity";
import {EventEntity} from "../../../../entities/event.entity";
import {CreateEventResponse} from "../create-event/create-event.response";
import {UpdateEventCommand} from "./update-event.command";

@CommandHandler(UpdateEventCommand)
export class UpdateEventHandler implements ICommandHandler<UpdateEventCommand> {
    async execute(command: UpdateEventCommand): Promise<CreateEventResponse> {
        const entity = await EventEntity.findOne({where: {id: command.id}, relations: {category: true}});
        if (!entity) throw new NotFoundException("event not found");

        const categoryExists = await EventCategoriesEntity.existsBy({id: command.eventcategoryId});
        if (!categoryExists) throw new BadRequestException("event category not found");

        entity.title = command.title;
        entity.content = command.content;
        entity.image = command.image;
        entity.date = command.date;
        entity.address = command.address;
        entity.category = {id: command.eventcategoryId} as EventCategoriesEntity;
        await EventEntity.save(entity);

        return plainToInstance(CreateEventResponse, entity, {excludeExtraneousValues: true});
    }
}
