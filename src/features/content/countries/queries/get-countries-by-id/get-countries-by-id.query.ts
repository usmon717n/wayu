import {Query} from '@nestjs/cqrs';
import {CountryDto} from '@/features/content/countries/country.dto';

export class GetCountriesByIdQuery extends Query<CountryDto> {
  constructor(public readonly id: number) { super(); }
}
