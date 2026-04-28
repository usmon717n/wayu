import {PartialType} from '@nestjs/swagger';
import {CreateNewsCategoriesDto} from './create-news-categories.dto';

export class UpdateNewsCategoriesDto extends PartialType(CreateNewsCategoriesDto) {}
