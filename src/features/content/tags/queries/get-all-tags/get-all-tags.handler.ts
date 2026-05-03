import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Tag} from '@/features/content/tags/tag.entity';
import {TagDto} from '@/features/content/tags/tag.dto';
import {GetAllTagsQuery} from './get-all-tags.query';
@QueryHandler(GetAllTagsQuery)
export class GetAllTagsHandler implements IQueryHandler<GetAllTagsQuery> {
  async execute(query: GetAllTagsQuery): Promise<TagDto[]> {
    const take = query.filters.size ?? 10; const page = query.filters.page ?? 1; const skip = (page - 1) * take;
    const items = await Tag.find({skip, take, order: {id: 'DESC'}});
    return plainToInstance(TagDto, items, {excludeExtraneousValues: true});
  }
}
