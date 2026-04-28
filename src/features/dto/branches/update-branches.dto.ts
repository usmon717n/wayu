import {PartialType} from '@nestjs/swagger';
import {CreateBranchesDto} from './create-branches.dto';

export class UpdateBranchesDto extends PartialType(CreateBranchesDto) {}
