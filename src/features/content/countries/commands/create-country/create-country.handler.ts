import {BadRequestException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {ILike} from "typeorm";
import {CountriesEntity} from "../../../../entities/countries.entity";
import {CreateCountryCommand} from "./create-country.command";
import {CreateCountryResponse} from "./create-country.response";

@CommandHandler(CreateCountryCommand)
export class CreateCountryHandler implements ICommandHandler<CreateCountryCommand> {
    async execute(command: CreateCountryCommand): Promise<CreateCountryResponse> {
        const alreadyExists = await CountriesEntity.existsBy({title: ILike(command.title)});
        if (alreadyExists) {
            throw new BadRequestException("title is already taken");
        }

        const entity = CountriesEntity.create({title: command.title, flag: command.flag} as CountriesEntity);
        await CountriesEntity.save(entity);
        return plainToInstance(CreateCountryResponse, entity, {excludeExtraneousValues: true});
    }
}
