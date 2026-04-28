import {PartialType} from '@nestjs/swagger';
import {CreateAuthorsDto} from './create-authors.dto';

export class UpdateAuthorsDto extends PartialType(CreateAuthorsDto) {}
