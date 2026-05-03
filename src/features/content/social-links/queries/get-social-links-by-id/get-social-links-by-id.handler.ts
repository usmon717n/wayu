import {NotFoundException} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {SocialLink} from '@/features/content/social-links/social-link.entity';
import {SocialLinkDto} from '@/features/content/social-links/social-link.dto';
import {GetSocialLinksByIdQuery} from './get-social-links-by-id.query';

@QueryHandler(GetSocialLinksByIdQuery)
export class GetSocialLinksByIdHandler implements IQueryHandler<GetSocialLinksByIdQuery> {
  async execute(query: GetSocialLinksByIdQuery): Promise<SocialLinkDto> {
    const item = await SocialLink.findOneBy({id: query.id});
    if (!item) throw new NotFoundException('SocialLink with given id not found');
    return plainToInstance(SocialLinkDto, item, {excludeExtraneousValues: true});
  }
}
