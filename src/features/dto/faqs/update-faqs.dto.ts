import {PartialType} from '@nestjs/swagger';
import {CreateFaqsDto} from './create-faqs.dto';

export class UpdateFaqsDto extends PartialType(CreateFaqsDto) {}
