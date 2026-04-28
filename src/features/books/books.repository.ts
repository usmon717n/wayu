import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {BooksEntity} from '../entities/books/books.entity';
import {CreateBooksDto} from '../dto/books/create-books.dto';
import {UpdateBooksDto} from '../dto/books/update-books.dto';

@Injectable()
export class BooksRepository {
  constructor(@InjectRepository(BooksEntity) private readonly repo: Repository<BooksEntity>) {}
  async createOne(payload: CreateBooksDto) { return this.repo.save(this.repo.create(payload)); }
  async updateOne(id: number, payload: UpdateBooksDto) { await this.repo.update({id}, payload); }
  async deleteOne(id: number) { await this.repo.delete({id}); }
  async findById(id: number) { return this.repo.findOne({where: {id}}); }
  async findPaginated(page: number, limit: number) { return this.repo.findAndCount({order: {id: 'DESC'}, skip: (page - 1) * limit, take: limit}); }
}
