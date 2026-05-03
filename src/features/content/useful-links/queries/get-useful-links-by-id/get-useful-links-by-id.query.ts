import {Query} from '@nestjs/cqrs';
import {UsefulLinkDto} from '@/features/content/useful-links/useful-link.dto';
export class GetUsefulLinksByIdQuery extends Query<UsefulLinkDto> { constructor(public readonly id: number) { super(); } }
