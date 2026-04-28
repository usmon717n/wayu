import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {BookCategoriesRepository} from './book-categories.repository';
import {CreateBookCategoriesDto} from '../dto/book-categories/create-book-categories.dto';
import {UpdateBookCategoriesDto} from '../dto/book-categories/update-book-categories.dto';
import {DeleteBookCategoriesDto} from '../dto/book-categories/delete-book-categories.dto';
import {DetailBookCategoriesDto} from '../dto/book-categories/detail-book-categories.dto';
import {ListBookCategoriesDto} from '../dto/book-categories/list-book-categories.dto';

@Injectable()
export class BookCategoriesService {
  constructor(private readonly repo: BookCategoriesRepository) {}
  async create(dto: CreateBookCategoriesDto) {
    if (await this.repo.findByTitle(dto.title)) throw new ConflictException('Book category already exists');
    return {message: 'Book category created', data: await this.repo.createOne(dto)};
  }
  async update(dto: UpdateBookCategoriesDto & DetailBookCategoriesDto) {
    const exists = await this.repo.findById(dto.id); if (!exists) throw new NotFoundException('Book category not found');
    if (dto.title) {
      const byTitle = await this.repo.findByTitle(dto.title);
      if (byTitle && byTitle.id !== dto.id) throw new ConflictException('Book category already exists');
    }
    const {id, ...payload} = dto; await this.repo.updateOne(id, payload);
    return {message: 'Book category updated', data: await this.repo.findById(id)};
  }
  async delete(dto: DeleteBookCategoriesDto) {
    if (!(await this.repo.findById(dto.id))) throw new NotFoundException('Book category not found');
    await this.repo.deleteOne(dto.id); return {message: 'Book category deleted'};
  }
  async detail(dto: DetailBookCategoriesDto) { const data = await this.repo.findById(dto.id); if (!data) throw new NotFoundException('Book category not found'); return {data}; }
  async list(dto: ListBookCategoriesDto) {
    const page = dto.page ?? 1; const limit = dto.limit ?? 10; const [items, total] = await this.repo.findPaginated(page, limit);
    return {data: items, pagination: {page, limit, total, totalPages: Math.ceil(total / limit)}};
  }
}
