import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Country} from '@/features/content/countries/country.entity';
import {CountryDto} from '@/features/content/countries/country.dto';
import {GetAllCountriesQuery} from './get-all-countries.query';

@QueryHandler(GetAllCountriesQuery)
export class GetAllCountriesHandler implements IQueryHandler<GetAllCountriesQuery> {
  async execute(query: GetAllCountriesQuery): Promise<CountryDto[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const skip = (page - 1) * take;
    const items = await Country.find({skip, take, order: {id: 'DESC'}});
    return plainToInstance(CountryDto, items, {excludeExtraneousValues: true});
  }
}
