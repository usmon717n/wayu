import {Query} from '@nestjs/cqrs';
import {BranchDto} from '@/features/content/branches/branch.dto';
import {GetAllBranchesFilters} from './get-all-branches.filters';
export class GetAllBranchesQuery extends Query<BranchDto[]> { constructor(public readonly filters: GetAllBranchesFilters) { super(); } }
