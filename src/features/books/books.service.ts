import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {BooksRepository} from './books.repository';
import {CreateBooksDto} from '../dto/books/create-books.dto';
import {UpdateBooksDto} from '../dto/books/update-books.dto';
import {DeleteBooksDto} from '../dto/books/delete-books.dto';
import {DetailBooksDto} from '../dto/books/detail-books.dto';
import {ListBooksDto} from '../dto/books/list-books.dto';
import {AuthorsEntity} from '../entities/authors/authors.entity';
import {BookCategoriesEntity} from '../entities/book-categories/book-categories.entity';

@Injectable()
export class BooksService {
  constructor(
    private readonly repo: BooksRepository,
    @InjectRepository(AuthorsEntity) private readonly authorsRepo: Repository<AuthorsEntity>,
    @InjectRepository(BookCategoriesEntity) private readonly categoriesRepo: Repository<BookCategoriesEntity>,
  ) {}

  private async validateRelations(authorId?: number, categoryId?: number) {
    if (authorId && !(await this.authorsRepo.findOne({where: {id: authorId}}))) throw new NotFoundException('Author not found');
    if (categoryId && !(await this.categoriesRepo.findOne({where: {id: categoryId}}))) throw new NotFoundException('Book category not found');
  }

  async create(dto: CreateBooksDto) {
    await this.validateRelations(dto.authorId, dto.categoryId);
    return {message: 'Book created', data: await this.repo.createOne(dto)};
  }

  async update(dto: UpdateBooksDto & DetailBooksDto) {
    if (!(await this.repo.findById(dto.id))) throw new NotFoundException('Book not found');
    await this.validateRelations(dto.authorId, dto.categoryId);
    const {id, ...payload} = dto;
    await this.repo.updateOne(id, payload);
    return {message: 'Book updated', data: await this.repo.findById(id)};
  }

  async delete(dto: DeleteBooksDto) {
    if (!(await this.repo.findById(dto.id))) throw new NotFoundException('Book not found');
    await this.repo.deleteOne(dto.id);
    return {message: 'Book deleted'};
  }

  async detail(dto: DetailBooksDto) {
    const data = await this.repo.findById(dto.id);
    if (!data) throw new NotFoundException('Book not found');
    return {data};
  }

  async list(dto: ListBooksDto) {
    const page = dto.page ?? 1; const limit = dto.limit ?? 10;
    const [items, total] = await this.repo.findPaginated(page, limit);
    return {data: items, pagination: {page, limit, total, totalPages: Math.ceil(total / limit)}};
  }
}
