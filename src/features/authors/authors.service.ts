import {Injectable, NotFoundException} from '@nestjs/common';
import {AuthorsRepository} from './authors.repository';
import {CreateAuthorsDto} from '../dto/authors/create-authors.dto';
import {UpdateAuthorsDto} from '../dto/authors/update-authors.dto';
import {DeleteAuthorsDto} from '../dto/authors/delete-authors.dto';
import {DetailAuthorsDto} from '../dto/authors/detail-authors.dto';
import {ListAuthorsDto} from '../dto/authors/list-authors.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly authorsRepository: AuthorsRepository) {}
  async create(dto: CreateAuthorsDto) { return {message: 'Author created', data: await this.authorsRepository.createOne(dto)}; }
  async update(dto: UpdateAuthorsDto & DetailAuthorsDto) {
    const exists = await this.authorsRepository.findById(dto.id);
    if (!exists) throw new NotFoundException('Author not found');
    const {id, ...payload} = dto;
    await this.authorsRepository.updateOne(id, payload);
    return {message: 'Author updated', data: await this.authorsRepository.findById(id)};
  }
  async delete(dto: DeleteAuthorsDto) {
    if (!(await this.authorsRepository.findById(dto.id))) throw new NotFoundException('Author not found');
    await this.authorsRepository.deleteOne(dto.id);
    return {message: 'Author deleted'};
  }
  async detail(dto: DetailAuthorsDto) {
    const data = await this.authorsRepository.findById(dto.id);
    if (!data) throw new NotFoundException('Author not found');
    return {data};
  }
  async list(dto: ListAuthorsDto) {
    const page = dto.page ?? 1; const limit = dto.limit ?? 10;
    const [items, total] = await this.authorsRepository.findPaginated(page, limit);
    return {data: items, pagination: {page, limit, total, totalPages: Math.ceil(total / limit)}};
  }
}
