import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {SocialLink} from '@/features/content/social-links/social-link.entity';
import {SocialLinkDto} from '@/features/content/social-links/social-link.dto';
import {GetAllSocialLinksQuery} from './get-all-social-links.query';

@QueryHandler(GetAllSocialLinksQuery)
export class GetAllSocialLinksHandler implements IQueryHandler<GetAllSocialLinksQuery> {
  async execute(query: GetAllSocialLinksQuery): Promise<SocialLinkDto[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const skip = (page - 1) * take;
    const items = await SocialLink.find({skip, take, order: {id: 'DESC'}});
    return plainToInstance(SocialLinkDto, items, {excludeExtraneousValues: true});
  }
}
