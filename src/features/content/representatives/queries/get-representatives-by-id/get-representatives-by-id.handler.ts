import {NotFoundException} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Representative} from '@/features/content/representatives/representative.entity';
import {RepresentativeDto} from '@/features/content/representatives/representative.dto';
import {GetRepresentativesByIdQuery} from './get-representatives-by-id.query';
@QueryHandler(GetRepresentativesByIdQuery)
export class GetRepresentativesByIdHandler implements IQueryHandler<GetRepresentativesByIdQuery> {
  async execute(query: GetRepresentativesByIdQuery): Promise<RepresentativeDto> {
    const item = await Representative.findOneBy({id: query.id});
    if (!item) throw new NotFoundException('Representative with given id not found');
    return plainToInstance(RepresentativeDto, item, {excludeExtraneousValues: true});
  }
}
