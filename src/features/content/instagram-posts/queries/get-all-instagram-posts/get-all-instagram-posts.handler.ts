import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {InstagramPost} from '@/features/content/instagram-posts/instagram-post.entity';
import {InstagramPostDto} from '@/features/content/instagram-posts/instagram-post.dto';
import {GetAllInstagramPostsQuery} from './get-all-instagram-posts.query';

@QueryHandler(GetAllInstagramPostsQuery)
export class GetAllInstagramPostsHandler implements IQueryHandler<GetAllInstagramPostsQuery> {
  async execute(query: GetAllInstagramPostsQuery): Promise<InstagramPostDto[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const skip = (page - 1) * take;
    const items = await InstagramPost.find({skip, take, order: {id: 'DESC'}});
    return plainToInstance(InstagramPostDto, items, {excludeExtraneousValues: true});
  }
}
