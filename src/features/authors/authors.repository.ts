import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {AuthorsEntity} from '../entities/authors/authors.entity';
import {CreateAuthorsDto} from '../dto/authors/create-authors.dto';
import {UpdateAuthorsDto} from '../dto/authors/update-authors.dto';

@Injectable()
export class AuthorsRepository {
  constructor(@InjectRepository(AuthorsEntity) private readonly repo: Repository<AuthorsEntity>) {}

  async createOne(payload: CreateAuthorsDto) { return this.repo.save(this.repo.create(payload)); }
  async updateOne(id: number, payload: UpdateAuthorsDto) { await this.repo.update({id}, payload); }
  async deleteOne(id: number) { await this.repo.delete({id}); }
  async findById(id: number) { return this.repo.findOne({where: {id}}); }
  async findPaginated(page: number, limit: number) {
    return this.repo.findAndCount({order: {id: 'DESC'}, skip: (page - 1) * limit, take: limit});
  }
}
