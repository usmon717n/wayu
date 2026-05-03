import {Query} from '@nestjs/cqrs';
import {TagDto} from '@/features/content/tags/tag.dto';
export class GetTagsByIdQuery extends Query<TagDto> { constructor(public readonly id: number) { super(); } }
