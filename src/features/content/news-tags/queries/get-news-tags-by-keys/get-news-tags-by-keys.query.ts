import {Query} from '@nestjs/cqrs';
import {NewsTagDto} from '@/features/content/news-tags/news-tag.dto';
export class GetNewsTagsByKeysQuery extends Query<NewsTagDto> {
  constructor(public readonly newsId: number, public readonly tagId: number) { super(); }
}
