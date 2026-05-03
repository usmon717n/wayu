import {Query} from '@nestjs/cqrs';
import {RepresentativeDto} from '@/features/content/representatives/representative.dto';
export class GetRepresentativesByIdQuery extends Query<RepresentativeDto> { constructor(public readonly id: number) { super(); } }
