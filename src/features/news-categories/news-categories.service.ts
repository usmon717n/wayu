import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {NewsCategoriesRepository} from './news-categories.repository';
import {CreateNewsCategoriesDto} from '../dto/news-categories/create-news-categories.dto';
import {UpdateNewsCategoriesDto} from '../dto/news-categories/update-news-categories.dto';
import {DeleteNewsCategoriesDto} from '../dto/news-categories/delete-news-categories.dto';
import {DetailNewsCategoriesDto} from '../dto/news-categories/detail-news-categories.dto';
import {ListNewsCategoriesDto} from '../dto/news-categories/list-news-categories.dto';

@Injectable()
export class NewsCategoriesService {
  constructor(private readonly repo: NewsCategoriesRepository) {}
  async create(dto: CreateNewsCategoriesDto) {
    if (await this.repo.findByTitle(dto.title)) throw new ConflictException('News category already exists');
    return {message: 'News category created', data: await this.repo.createOne(dto)};
  }
  async update(dto: UpdateNewsCategoriesDto & DetailNewsCategoriesDto) {
    const exists = await this.repo.findById(dto.id); if (!exists) throw new NotFoundException('News category not found');
    if (dto.title) { const byTitle = await this.repo.findByTitle(dto.title); if (byTitle && byTitle.id !== dto.id) throw new ConflictException('News category already exists'); }
    const {id, ...payload} = dto; await this.repo.updateOne(id, payload);
    return {message: 'News category updated', data: await this.repo.findById(id)};
  }
  async delete(dto: DeleteNewsCategoriesDto) { if (!(await this.repo.findById(dto.id))) throw new NotFoundException('News category not found'); await this.repo.deleteOne(dto.id); return {message: 'News category deleted'}; }
  async detail(dto: DetailNewsCategoriesDto) { const data = await this.repo.findById(dto.id); if (!data) throw new NotFoundException('News category not found'); return {data}; }
  async list(dto: ListNewsCategoriesDto) { const page = dto.page ?? 1; const limit = dto.limit ?? 10; const [items, total] = await this.repo.findPaginated(page, limit); return {data: items, pagination: {page, limit, total, totalPages: Math.ceil(total / limit)}}; }
}
