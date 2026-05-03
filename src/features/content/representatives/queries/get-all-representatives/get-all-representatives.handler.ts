import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Representative} from '@/features/content/representatives/representative.entity';
import {RepresentativeDto} from '@/features/content/representatives/representative.dto';
import {GetAllRepresentativesQuery} from './get-all-representatives.query';
@QueryHandler(GetAllRepresentativesQuery)
export class GetAllRepresentativesHandler implements IQueryHandler<GetAllRepresentativesQuery> {
  async execute(query: GetAllRepresentativesQuery): Promise<RepresentativeDto[]> {
    const take = query.filters.size ?? 10; const page = query.filters.page ?? 1; const skip = (page - 1) * take;
    const items = await Representative.find({skip, take, order: {id: 'DESC'}});
    return plainToInstance(RepresentativeDto, items, {excludeExtraneousValues: true});
  }
}
