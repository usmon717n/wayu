import {PartialType} from '@nestjs/swagger';
import {CreateCountriesDto} from './create-countries.dto';

export class UpdateCountriesDto extends PartialType(CreateCountriesDto) {}
