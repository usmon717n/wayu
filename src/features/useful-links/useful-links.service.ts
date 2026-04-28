import {Injectable, NotFoundException} from '@nestjs/common';
import {UsefulLinksRepository} from './useful-links.repository';
import {CreateUsefulLinksDto} from '../dto/useful-links/create-useful-links.dto';
import {UpdateUsefulLinksDto} from '../dto/useful-links/update-useful-links.dto';
import {DeleteUsefulLinksDto} from '../dto/useful-links/delete-useful-links.dto';
import {DetailUsefulLinksDto} from '../dto/useful-links/detail-useful-links.dto';
import {ListUsefulLinksDto} from '../dto/useful-links/list-useful-links.dto';

@Injectable()
export class UsefulLinksService {
  constructor(private readonly usefulLinksRepository: UsefulLinksRepository) {}

  async create(dto: CreateUsefulLinksDto) {
    const data = await this.usefulLinksRepository.createOne(dto);
    return {message: 'Useful link created', data};
  }

  async update(dto: UpdateUsefulLinksDto & DetailUsefulLinksDto) {
    const exists = await this.usefulLinksRepository.findById(dto.id);
    if (!exists) {
      throw new NotFoundException('Useful link not found');
    }

    const {id, ...payload} = dto;
    await this.usefulLinksRepository.updateOne(id, payload);
    const data = await this.usefulLinksRepository.findById(id);

    return {message: 'Useful link updated', data};
  }

  async delete(dto: DeleteUsefulLinksDto) {
    const exists = await this.usefulLinksRepository.findById(dto.id);
    if (!exists) {
      throw new NotFoundException('Useful link not found');
    }

    await this.usefulLinksRepository.deleteOne(dto.id);
    return {message: 'Useful link deleted'};
  }

  async detail(dto: DetailUsefulLinksDto) {
    const data = await this.usefulLinksRepository.findById(dto.id);
    if (!data) {
      throw new NotFoundException('Useful link not found');
    }

    return {data};
  }

  async list(dto: ListUsefulLinksDto) {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 10;

    const [items, total] = await this.usefulLinksRepository.findPaginated(page, limit);

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
