import {Query} from '@nestjs/cqrs';
import {InstagramPostDto} from '@/features/content/instagram-posts/instagram-post.dto';

export class GetInstagramPostsByIdQuery extends Query<InstagramPostDto> {
  constructor(public readonly id: number) { super(); }
}
