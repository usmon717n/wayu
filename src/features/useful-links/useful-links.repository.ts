import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UsefulLinkEntity} from '../entities/useful-links/useful-links.entity';
import {CreateUsefulLinksDto} from '../dto/useful-links/create-useful-links.dto';
import {UpdateUsefulLinksDto} from '../dto/useful-links/update-useful-links.dto';

@Injectable()
export class UsefulLinksRepository {
  constructor(
    @InjectRepository(UsefulLinkEntity)
    private readonly repo: Repository<UsefulLinkEntity>,
  ) {}

  
  async createOne(payload: CreateUsefulLinksDto): Promise<UsefulLinkEntity> {
    const entity = this.repo.create(payload);
    return this.repo.save(entity);
  }

  async updateOne(id: number, payload: UpdateUsefulLinksDto): Promise<void> {
    await this.repo.update({id}, payload);
  }

  async deleteOne(id: number): Promise<void> {
    await this.repo.delete({id});
  }

  // Query side
  async findById(id: number): Promise<UsefulLinkEntity | null> {
    return this.repo.findOne({where: {id}});
  }

  async findPaginated(page: number, limit: number): Promise<[UsefulLinkEntity[], number]> {
    return this.repo.findAndCount({
      order: {id: 'DESC'},
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
