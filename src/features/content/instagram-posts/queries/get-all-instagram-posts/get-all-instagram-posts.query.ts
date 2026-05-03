import {Query} from '@nestjs/cqrs';
import {InstagramPostDto} from '@/features/content/instagram-posts/instagram-post.dto';
import {GetAllInstagramPostsFilters} from './get-all-instagram-posts.filters';

export class GetAllInstagramPostsQuery extends Query<InstagramPostDto[]> {
  constructor(public readonly filters: GetAllInstagramPostsFilters) { super(); }
}
