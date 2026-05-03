import {NotFoundException} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {InstagramPost} from '@/features/content/instagram-posts/instagram-post.entity';
import {InstagramPostDto} from '@/features/content/instagram-posts/instagram-post.dto';
import {GetInstagramPostsByIdQuery} from './get-instagram-posts-by-id.query';

@QueryHandler(GetInstagramPostsByIdQuery)
export class GetInstagramPostsByIdHandler implements IQueryHandler<GetInstagramPostsByIdQuery> {
  async execute(query: GetInstagramPostsByIdQuery): Promise<InstagramPostDto> {
    const item = await InstagramPost.findOneBy({id: query.id});
    if (!item) throw new NotFoundException('InstagramPost with given id not found');
    return plainToInstance(InstagramPostDto, item, {excludeExtraneousValues: true});
  }
}
