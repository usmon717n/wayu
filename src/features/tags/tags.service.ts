import {Injectable, NotFoundException} from '@nestjs/common';
import {TagsRepository} from './tags.repository';
import {CreateTagsDto} from '../dto/tags/create-tags.dto';
import {UpdateTagsDto} from '../dto/tags/update-tags.dto';
import {DeleteTagsDto} from '../dto/tags/delete-tags.dto';
import {DetailTagsDto} from '../dto/tags/detail-tags.dto';
import {ListTagsDto} from '../dto/tags/list-tags.dto';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository: TagsRepository) {}

  async create(dto: CreateTagsDto) {
    const data = await this.tagsRepository.createOne(dto);
    return {message: 'Tag created', data};
  }

  async update(dto: UpdateTagsDto & DetailTagsDto) {
    const exists = await this.tagsRepository.findById(dto.id);
    if (!exists) {
      throw new NotFoundException('Tag not found');
    }

    const {id, ...payload} = dto;
    await this.tagsRepository.updateOne(id, payload);
    const data = await this.tagsRepository.findById(id);

    return {message: 'Tag updated', data};
  }

  async delete(dto: DeleteTagsDto) {
    const exists = await this.tagsRepository.findById(dto.id);
    if (!exists) {
      throw new NotFoundException('Tag not found');
    }

    await this.tagsRepository.deleteOne(dto.id);
    return {message: 'Tag deleted'};
  }

  async detail(dto: DetailTagsDto) {
    const data = await this.tagsRepository.findById(dto.id);
    if (!data) {
      throw new NotFoundException('Tag not found');
    }

    return {data};
  }

  async list(dto: ListTagsDto) {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 10;

    const [items, total] = await this.tagsRepository.findPaginated(page, limit);

    return {
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
