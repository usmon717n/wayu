import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {EventsRepository} from './events.repository';
import {CreateEventsDto} from '../dto/events/create-events.dto';
import {UpdateEventsDto} from '../dto/events/update-events.dto';
import {DeleteEventsDto} from '../dto/events/delete-events.dto';
import {DetailEventsDto} from '../dto/events/detail-events.dto';
import {ListEventsDto} from '../dto/events/list-events.dto';
import {EventCategoriesEntity} from '../entities/event-categories/event-categories.entity';

@Injectable()
export class EventsService {
  constructor(
    private readonly repo: EventsRepository,
    @InjectRepository(EventCategoriesEntity) private readonly categoriesRepo: Repository<EventCategoriesEntity>,
  ) {}

  private async ensureCategory(categoryId?: number) {
    if (categoryId && !(await this.categoriesRepo.findOne({where: {id: categoryId}}))) {
      throw new NotFoundException('Event category not found');
    }
  }

  async create(dto: CreateEventsDto) {
    await this.ensureCategory(dto.categoryId);
    return {message: 'Event created', data: await this.repo.createOne(dto)};
  }

  async update(dto: UpdateEventsDto & DetailEventsDto) {
    if (!(await this.repo.findById(dto.id))) throw new NotFoundException('Event not found');
    await this.ensureCategory(dto.categoryId);
    const {id, ...payload} = dto;
    await this.repo.updateOne(id, payload);
    return {message: 'Event updated', data: await this.repo.findById(id)};
  }

  async delete(dto: DeleteEventsDto) {
    if (!(await this.repo.findById(dto.id))) throw new NotFoundException('Event not found');
    await this.repo.deleteOne(dto.id);
    return {message: 'Event deleted'};
  }

  async detail(dto: DetailEventsDto) {
    const data = await this.repo.findById(dto.id);
    if (!data) throw new NotFoundException('Event not found');
    return {data};
  }

  async list(dto: ListEventsDto) {
    const page = dto.page ?? 1; const limit = dto.limit ?? 10;
    const [items, total] = await this.repo.findPaginated(page, limit);
    return {data: items, pagination: {page, limit, total, totalPages: Math.ceil(total / limit)}};
  }
}
