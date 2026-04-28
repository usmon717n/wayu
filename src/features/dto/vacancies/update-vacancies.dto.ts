import {PartialType} from '@nestjs/swagger';
import {CreateVacanciesDto} from './create-vacancies.dto';

export class UpdateVacanciesDto extends PartialType(CreateVacanciesDto) {}
