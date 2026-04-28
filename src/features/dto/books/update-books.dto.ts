import {PartialType} from '@nestjs/swagger';
import {CreateBooksDto} from './create-books.dto';

export class UpdateBooksDto extends PartialType(CreateBooksDto) {}
