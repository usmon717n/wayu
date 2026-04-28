import {BadRequestException, NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {ILike, Not} from "typeorm";
import {CountriesEntity} from "../../../../entities/countries.entity";
import {CreateCountryResponse} from "../create-country/create-country.response";
import {UpdateCountryCommand} from "./update-country.command";

@CommandHandler(UpdateCountryCommand)
export class UpdateCountryHandler implements ICommandHandler<UpdateCountryCommand> {
    async execute(command: UpdateCountryCommand): Promise<CreateCountryResponse> {
        const entity = await CountriesEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("country not found");

        const titleTaken = await CountriesEntity.existsBy({title: ILike(command.title), id: Not(command.id)});
        if (titleTaken) throw new BadRequestException("title is already taken");

        entity.title = command.title;
        entity.flag = command.flag;
        await CountriesEntity.save(entity);

        return plainToInstance(CreateCountryResponse, entity, {excludeExtraneousValues: true});
    }
}
