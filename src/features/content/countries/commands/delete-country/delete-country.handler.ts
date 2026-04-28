import {BadRequestException, NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {BranchesEntity} from "../../../../entities/branches.entity";
import {CountriesEntity} from "../../../../entities/countries.entity";
import {NewsEntity} from "../../../../news/news/news.entity";
import {DeleteCountryCommand} from "./delete-country.command";

@CommandHandler(DeleteCountryCommand)
export class DeleteCountryHandler implements ICommandHandler<DeleteCountryCommand> {
    async execute(command: DeleteCountryCommand): Promise<void> {
        const entity = await CountriesEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("country not found");

        const hasNews = await NewsEntity.exists({where: {country: {id: command.id}}});
        const hasBranches = await BranchesEntity.exists({where: {country: {id: command.id}}});
        if (hasNews || hasBranches) throw new BadRequestException("country has attached data");

        await CountriesEntity.remove(entity);
    }
}
