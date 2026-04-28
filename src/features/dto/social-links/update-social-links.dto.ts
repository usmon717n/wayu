import {PartialType} from '@nestjs/swagger';
import {CreateSocialLinksDto} from './create-social-links.dto';

export class UpdateSocialLinksDto extends PartialType(CreateSocialLinksDto) {}
