import {Query} from '@nestjs/cqrs';
import {SocialLinkDto} from '@/features/content/social-links/social-link.dto';
export class GetSocialLinksByIdQuery extends Query<SocialLinkDto> { constructor(public readonly id: number) { super(); } }
