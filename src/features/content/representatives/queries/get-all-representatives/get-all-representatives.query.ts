import {Query} from '@nestjs/cqrs';
import {RepresentativeDto} from '@/features/content/representatives/representative.dto';
import {GetAllRepresentativesFilters} from './get-all-representatives.filters';
export class GetAllRepresentativesQuery extends Query<RepresentativeDto[]> { constructor(public readonly filters: GetAllRepresentativesFilters) { super(); } }
