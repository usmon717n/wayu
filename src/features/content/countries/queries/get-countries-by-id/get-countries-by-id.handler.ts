import {NotFoundException} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Country} from '@/features/content/countries/country.entity';
import {CountryDto} from '@/features/content/countries/country.dto';
import {GetCountriesByIdQuery} from './get-countries-by-id.query';

@QueryHandler(GetCountriesByIdQuery)
export class GetCountriesByIdHandler implements IQueryHandler<GetCountriesByIdQuery> {
  async execute(query: GetCountriesByIdQuery): Promise<CountryDto> {
    const item = await Country.findOneBy({id: query.id});
    if (!item) throw new NotFoundException('Country with given id not found');
    return plainToInstance(CountryDto, item, {excludeExtraneousValues: true});
  }
}
