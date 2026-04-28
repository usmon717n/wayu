import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {EventsEntity} from '../entities/events/events.entity';
import {CreateEventsDto} from '../dto/events/create-events.dto';
import {UpdateEventsDto} from '../dto/events/update-events.dto';

@Injectable()
export class EventsRepository {
  constructor(@InjectRepository(EventsEntity) private readonly repo: Repository<EventsEntity>) {}
  async createOne(payload: CreateEventsDto) { return this.repo.save(this.repo.create(payload)); }
  async updateOne(id: number, payload: UpdateEventsDto) { await this.repo.update({id}, payload); }
  async deleteOne(id: number) { await this.repo.delete({id}); }
  async findById(id: number) { return this.repo.findOne({where: {id}}); }
  async findPaginated(page: number, limit: number) { return this.repo.findAndCount({order: {id: 'DESC'}, skip: (page - 1) * limit, take: limit}); }
}
