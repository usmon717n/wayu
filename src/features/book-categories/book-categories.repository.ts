import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {BookCategoriesEntity} from '../entities/book-categories/book-categories.entity';
import {CreateBookCategoriesDto} from '../dto/book-categories/create-book-categories.dto';
import {UpdateBookCategoriesDto} from '../dto/book-categories/update-book-categories.dto';

@Injectable()
export class BookCategoriesRepository {
  constructor(@InjectRepository(BookCategoriesEntity) private readonly repo: Repository<BookCategoriesEntity>) {}
  async createOne(payload: CreateBookCategoriesDto) { return this.repo.save(this.repo.create(payload)); }
  async updateOne(id: number, payload: UpdateBookCategoriesDto) { await this.repo.update({id}, payload); }
  async deleteOne(id: number) { await this.repo.delete({id}); }
  async findById(id: number) { return this.repo.findOne({where: {id}}); }
  async findByTitle(title: string) { return this.repo.findOne({where: {title}}); }
  async findPaginated(page: number, limit: number) { return this.repo.findAndCount({order: {id: 'DESC'}, skip: (page - 1) * limit, take: limit}); }
}
