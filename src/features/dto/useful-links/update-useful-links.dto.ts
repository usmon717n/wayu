import {PartialType} from '@nestjs/swagger';
import {CreateUsefulLinksDto} from './create-useful-links.dto';

export class UpdateUsefulLinksDto extends PartialType(CreateUsefulLinksDto) {}
