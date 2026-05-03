import {NotFoundException} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {NewsTag} from '@/features/content/news-tags/news-tag.entity';
import {NewsTagDto} from '@/features/content/news-tags/news-tag.dto';
import {GetNewsTagsByKeysQuery} from './get-news-tags-by-keys.query';
@QueryHandler(GetNewsTagsByKeysQuery)
export class GetNewsTagsByKeysHandler implements IQueryHandler<GetNewsTagsByKeysQuery> {
  async execute(query: GetNewsTagsByKeysQuery): Promise<NewsTagDto> {
    const item = await NewsTag.findOneBy({newsId: query.newsId, tagId: query.tagId});
    if (!item) throw new NotFoundException('NewsTag relation not found');
    return plainToInstance(NewsTagDto, item, {excludeExtraneousValues: true});
  }
}
