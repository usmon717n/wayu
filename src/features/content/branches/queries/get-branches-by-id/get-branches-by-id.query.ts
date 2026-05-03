import {Query} from '@nestjs/cqrs';
import {BranchDto} from '@/features/content/branches/branch.dto';
export class GetBranchesByIdQuery extends Query<BranchDto> { constructor(public readonly id: number) { super(); } }
