import {NotFoundException} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Tag} from '@/features/content/tags/tag.entity';
import {TagDto} from '@/features/content/tags/tag.dto';
import {GetTagsByIdQuery} from './get-tags-by-id.query';
@QueryHandler(GetTagsByIdQuery)
export class GetTagsByIdHandler implements IQueryHandler<GetTagsByIdQuery> {
  async execute(query: GetTagsByIdQuery): Promise<TagDto> {
    const item = await Tag.findOneBy({id: query.id});
    if (!item) throw new NotFoundException('Tag with given id not found');
    return plainToInstance(TagDto, item, {excludeExtraneousValues: true});
  }
}
