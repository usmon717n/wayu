import {PartialType} from '@nestjs/swagger';
import {CreateFaqsTagsDto} from './create-faqs-tags.dto';

export class UpdateFaqsTagsDto extends PartialType(CreateFaqsTagsDto) {}
