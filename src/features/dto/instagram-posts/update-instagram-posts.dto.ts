import {PartialType} from '@nestjs/swagger';
import {CreateInstagramPostsDto} from './create-instagram-posts.dto';

export class UpdateInstagramPostsDto extends PartialType(CreateInstagramPostsDto) {}
