import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {EventCategoriesRepository} from './event-categories.repository';
import {CreateEventCategoriesDto} from '../dto/event-categories/create-event-categories.dto';
import {UpdateEventCategoriesDto} from '../dto/event-categories/update-event-categories.dto';
import {DeleteEventCategoriesDto} from '../dto/event-categories/delete-event-categories.dto';
import {DetailEventCategoriesDto} from '../dto/event-categories/detail-event-categories.dto';
import {ListEventCategoriesDto} from '../dto/event-categories/list-event-categories.dto';

@Injectable()
export class EventCategoriesService {
  constructor(private readonly repo: EventCategoriesRepository) {}
  async create(dto: CreateEventCategoriesDto) {
    if (await this.repo.findByTitle(dto.title)) throw new ConflictException('Event category already exists');
    return {message: 'Event category created', data: await this.repo.createOne(dto)};
  }
  async update(dto: UpdateEventCategoriesDto & DetailEventCategoriesDto) {
    const exists = await this.repo.findById(dto.id); if (!exists) throw new NotFoundException('Event category not found');
    if (dto.title) { const byTitle = await this.repo.findByTitle(dto.title); if (byTitle && byTitle.id !== dto.id) throw new ConflictException('Event category already exists'); }
    const {id, ...payload} = dto; await this.repo.updateOne(id, payload);
    return {message: 'Event category updated', data: await this.repo.findById(id)};
  }
  async delete(dto: DeleteEventCategoriesDto) { if (!(await this.repo.findById(dto.id))) throw new NotFoundException('Event category not found'); await this.repo.deleteOne(dto.id); return {message: 'Event category deleted'}; }
  async detail(dto: DetailEventCategoriesDto) { const data = await this.repo.findById(dto.id); if (!data) throw new NotFoundException('Event category not found'); return {data}; }
  async list(dto: ListEventCategoriesDto) { const page = dto.page ?? 1; const limit = dto.limit ?? 10; const [items, total] = await this.repo.findPaginated(page, limit); return {data: items, pagination: {page, limit, total, totalPages: Math.ceil(total / limit)}}; }
}
