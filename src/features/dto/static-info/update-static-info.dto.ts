import {PartialType} from '@nestjs/swagger';
import {CreateStaticInfoDto} from './create-static-info.dto';

export class UpdateStaticInfoDto extends PartialType(CreateStaticInfoDto) {}
