import {Query} from '@nestjs/cqrs';
import {NewsTagDto} from '@/features/content/news-tags/news-tag.dto';
import {GetAllNewsTagsFilters} from './get-all-news-tags.filters';
export class GetAllNewsTagsQuery extends Query<NewsTagDto[]> { constructor(public readonly filters: GetAllNewsTagsFilters) { super(); } }
