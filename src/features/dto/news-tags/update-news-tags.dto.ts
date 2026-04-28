import {PartialType} from '@nestjs/swagger';
import {CreateNewsTagsDto} from './create-news-tags.dto';

export class UpdateNewsTagsDto extends PartialType(CreateNewsTagsDto) {}
