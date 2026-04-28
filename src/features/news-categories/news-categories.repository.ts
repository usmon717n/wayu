import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {NewsCategoriesEntity} from '../entities/news-categories/news-categories.entity';
import {CreateNewsCategoriesDto} from '../dto/news-categories/create-news-categories.dto';
import {UpdateNewsCategoriesDto} from '../dto/news-categories/update-news-categories.dto';

@Injectable()
export class NewsCategoriesRepository {
  constructor(@InjectRepository(NewsCategoriesEntity) private readonly repo: Repository<NewsCategoriesEntity>) {}
  async createOne(payload: CreateNewsCategoriesDto) { return this.repo.save(this.repo.create(payload)); }
  async updateOne(id: number, payload: UpdateNewsCategoriesDto) { await this.repo.update({id}, payload); }
  async deleteOne(id: number) { await this.repo.delete({id}); }
  async findById(id: number) { return this.repo.findOne({where: {id}}); }
  async findByTitle(title: string) { return this.repo.findOne({where: {title}}); }
  async findPaginated(page: number, limit: number) { return this.repo.findAndCount({order: {id: 'DESC'}, skip: (page - 1) * limit, take: limit}); }
}
