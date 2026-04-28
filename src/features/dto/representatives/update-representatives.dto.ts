import {PartialType} from '@nestjs/swagger';
import {CreateRepresentativesDto} from './create-representatives.dto';

export class UpdateRepresentativesDto extends PartialType(CreateRepresentativesDto) {}
