import {Query} from '@nestjs/cqrs';
import {UsefulLinkDto} from '@/features/content/useful-links/useful-link.dto';
import {GetAllUsefulLinksFilters} from './get-all-useful-links.filters';
export class GetAllUsefulLinksQuery extends Query<UsefulLinkDto[]> { constructor(public readonly filters: GetAllUsefulLinksFilters) { super(); } }
