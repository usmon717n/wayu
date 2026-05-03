import {Query} from '@nestjs/cqrs';
import {CountryDto} from '@/features/content/countries/country.dto';
import {GetAllCountriesFilters} from './get-all-countries.filters';

export class GetAllCountriesQuery extends Query<CountryDto[]> {
  constructor(public readonly filters: GetAllCountriesFilters) { super(); }
}
