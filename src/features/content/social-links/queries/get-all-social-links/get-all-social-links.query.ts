import {Query} from '@nestjs/cqrs';
import {SocialLinkDto} from '@/features/content/social-links/social-link.dto';
import {GetAllSocialLinksFilters} from './get-all-social-links.filters';
export class GetAllSocialLinksQuery extends Query<SocialLinkDto[]> { constructor(public readonly filters: GetAllSocialLinksFilters) { super(); } }
