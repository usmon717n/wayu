import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {NewsRepository} from './news.repository';
import {CreateNewsDto} from '../dto/news/create-news.dto';
import {UpdateNewsDto} from '../dto/news/update-news.dto';
import {DeleteNewsDto} from '../dto/news/delete-news.dto';
import {DetailNewsDto} from '../dto/news/detail-news.dto';
import {ListNewsDto} from '../dto/news/list-news.dto';
import {NewsCategoriesEntity} from '../entities/news-categories/news-categories.entity';
import {CountriesEntity} from '../entities/countries/countries.entity';

@Injectable()
export class NewsService {
  constructor(
    private readonly repo: NewsRepository,
    @InjectRepository(NewsCategoriesEntity) private readonly categoriesRepo: Repository<NewsCategoriesEntity>,
    @InjectRepository(CountriesEntity) private readonly countriesRepo: Repository<CountriesEntity>,
  ) {}

  private async validateRelations(categoryId?: number, countryId?: number) {
    if (categoryId && !(await this.categoriesRepo.findOne({where: {id: categoryId}}))) throw new NotFoundException('News category not found');
    if (countryId && !(await this.countriesRepo.findOne({where: {id: countryId}}))) throw new NotFoundException('Country not found');
  }

  async create(dto: CreateNewsDto) {
    await this.validateRelations(dto.categoryId, dto.countryId);
    return {message: 'News created', data: await this.repo.createOne(dto)};
  }

  async update(dto: UpdateNewsDto & DetailNewsDto) {
    if (!(await this.repo.findById(dto.id))) throw new NotFoundException('News not found');
    await this.validateRelations(dto.categoryId, dto.countryId);
    const {id, ...payload} = dto;
    await this.repo.updateOne(id, payload);
    return {message: 'News updated', data: await this.repo.findById(id)};
  }

  async delete(dto: DeleteNewsDto) {
    if (!(await this.repo.findById(dto.id))) throw new NotFoundException('News not found');
    await this.repo.deleteOne(dto.id);
    return {message: 'News deleted'};
  }

  async detail(dto: DetailNewsDto) {
    const data = await this.repo.findById(dto.id);
    if (!data) throw new NotFoundException('News not found');
    return {data};
  }

  async list(dto: ListNewsDto) {
    const page = dto.page ?? 1; const limit = dto.limit ?? 10;
    const [items, total] = await this.repo.findPaginated(page, limit);
    return {data: items, pagination: {page, limit, total, totalPages: Math.ceil(total / limit)}};
  }
}
