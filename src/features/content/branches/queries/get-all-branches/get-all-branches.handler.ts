import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Branch} from '@/features/content/branches/branch.entity';
import {BranchDto} from '@/features/content/branches/branch.dto';
import {GetAllBranchesQuery} from './get-all-branches.query';
@QueryHandler(GetAllBranchesQuery)
export class GetAllBranchesHandler implements IQueryHandler<GetAllBranchesQuery> {
  async execute(query: GetAllBranchesQuery): Promise<BranchDto[]> {
    const take = query.filters.size ?? 10; const page = query.filters.page ?? 1; const skip = (page - 1) * take;
    const items = await Branch.find({skip, take, order: {id: 'DESC'}});
    return plainToInstance(BranchDto, items, {excludeExtraneousValues: true});
  }
}
