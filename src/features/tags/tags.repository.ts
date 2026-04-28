import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {TagsEntity} from '../entities/tags/tags.entity';
import {CreateTagsDto} from '../dto/tags/create-tags.dto';
import {UpdateTagsDto} from '../dto/tags/update-tags.dto';

@Injectable()
export class TagsRepository {
  constructor(
    @InjectRepository(TagsEntity)
    private readonly repo: Repository<TagsEntity>,
  ) {}

  async createOne(payload: CreateTagsDto): Promise<TagsEntity> {
    const entity = this.repo.create(payload);
    return this.repo.save(entity);
  }

  async updateOne(id: number, payload: UpdateTagsDto): Promise<void> {
    await this.repo.update({id}, payload);
  }

  async deleteOne(id: number): Promise<void> {
    await this.repo.delete({id});
  }

  async findById(id: number): Promise<TagsEntity | null> {
    return this.repo.findOne({where: {id}});
  }

  async findPaginated(page: number, limit: number): Promise<[TagsEntity[], number]> {
    return this.repo.findAndCount({
      order: {id: 'DESC'},
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
