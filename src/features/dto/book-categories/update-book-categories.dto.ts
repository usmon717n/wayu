import {PartialType} from '@nestjs/swagger';
import {CreateBookCategoriesDto} from './create-book-categories.dto';

export class UpdateBookCategoriesDto extends PartialType(CreateBookCategoriesDto) {}
