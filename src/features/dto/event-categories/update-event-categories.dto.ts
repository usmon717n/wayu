import {PartialType} from '@nestjs/swagger';
import {CreateEventCategoriesDto} from './create-event-categories.dto';

export class UpdateEventCategoriesDto extends PartialType(CreateEventCategoriesDto) {}
