import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {EventCategoriesEntity} from '../entities/event-categories/event-categories.entity';
import {CreateEventCategoriesDto} from '../dto/event-categories/create-event-categories.dto';
import {UpdateEventCategoriesDto} from '../dto/event-categories/update-event-categories.dto';

@Injectable()
export class EventCategoriesRepository {
  constructor(@InjectRepository(EventCategoriesEntity) private readonly repo: Repository<EventCategoriesEntity>) {}
  async createOne(payload: CreateEventCategoriesDto) { return this.repo.save(this.repo.create(payload)); }
  async updateOne(id: number, payload: UpdateEventCategoriesDto) { await this.repo.update({id}, payload); }
  async deleteOne(id: number) { await this.repo.delete({id}); }
  async findById(id: number) { return this.repo.findOne({where: {id}}); }
  async findByTitle(title: string) { return this.repo.findOne({where: {title}}); }
  async findPaginated(page: number, limit: number) { return this.repo.findAndCount({order: {id: 'DESC'}, skip: (page - 1) * limit, take: limit}); }
}
