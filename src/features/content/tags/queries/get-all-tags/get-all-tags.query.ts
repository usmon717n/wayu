import {Query} from '@nestjs/cqrs';
import {TagDto} from '@/features/content/tags/tag.dto';
import {GetAllTagsFilters} from './get-all-tags.filters';
export class GetAllTagsQuery extends Query<TagDto[]> { constructor(public readonly filters: GetAllTagsFilters) { super(); } }
