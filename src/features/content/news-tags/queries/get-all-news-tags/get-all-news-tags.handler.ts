import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {NewsTag} from '@/features/content/news-tags/news-tag.entity';
import {NewsTagDto} from '@/features/content/news-tags/news-tag.dto';
import {GetAllNewsTagsQuery} from './get-all-news-tags.query';
@QueryHandler(GetAllNewsTagsQuery)
export class GetAllNewsTagsHandler implements IQueryHandler<GetAllNewsTagsQuery> {
  async execute(query: GetAllNewsTagsQuery): Promise<NewsTagDto[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const skip = (page - 1) * take;
    const where: {newsId?: number; tagId?: number} = {};
    if (query.filters.newsId !== undefined) where.newsId = query.filters.newsId;
    if (query.filters.tagId !== undefined) where.tagId = query.filters.tagId;
    const items = await NewsTag.find({where, skip, take});
    return plainToInstance(NewsTagDto, items, {excludeExtraneousValues: true});
  }
}
