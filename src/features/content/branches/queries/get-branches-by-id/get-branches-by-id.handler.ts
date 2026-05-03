import {NotFoundException} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Branch} from '@/features/content/branches/branch.entity';
import {BranchDto} from '@/features/content/branches/branch.dto';
import {GetBranchesByIdQuery} from './get-branches-by-id.query';
@QueryHandler(GetBranchesByIdQuery)
export class GetBranchesByIdHandler implements IQueryHandler<GetBranchesByIdQuery> {
  async execute(query: GetBranchesByIdQuery): Promise<BranchDto> {
    const item = await Branch.findOneBy({id: query.id});
    if (!item) throw new NotFoundException('Branch with given id not found');
    return plainToInstance(BranchDto, item, {excludeExtraneousValues: true});
  }
}
