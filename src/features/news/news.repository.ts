import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {NewsEntity} from '../entities/news/news.entity';
import {CreateNewsDto} from '../dto/news/create-news.dto';
import {UpdateNewsDto} from '../dto/news/update-news.dto';

@Injectable()
export class NewsRepository {
  constructor(@InjectRepository(NewsEntity) private readonly repo: Repository<NewsEntity>) {}
  async createOne(payload: CreateNewsDto) { return this.repo.save(this.repo.create(payload)); }
  async updateOne(id: number, payload: UpdateNewsDto) { await this.repo.update({id}, payload); }
  async deleteOne(id: number) { await this.repo.delete({id}); }
  async findById(id: number) { return this.repo.findOne({where: {id}}); }
  async findPaginated(page: number, limit: number) { return this.repo.findAndCount({order: {id: 'DESC'}, skip: (page - 1) * limit, take: limit}); }
}
