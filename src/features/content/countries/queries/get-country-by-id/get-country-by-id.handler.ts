import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {CountriesEntity} from "../../../../entities/countries.entity";
import {CreateCountryResponse} from "../../commands/create-country/create-country.response";
import {GetCountryByIdQuery} from "./get-country-by-id.query";

@QueryHandler(GetCountryByIdQuery)
export class GetCountryByIdHandler implements IQueryHandler<GetCountryByIdQuery> {
    async execute(query: GetCountryByIdQuery): Promise<CreateCountryResponse> {
        const entity = await CountriesEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("country not found");
        return plainToInstance(CreateCountryResponse, entity, {excludeExtraneousValues: true});
    }
}
