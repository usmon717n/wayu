import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {IsString, MaxLength} from 'class-validator';
import {InstagramPostDto} from '@/features/content/instagram-posts/instagram-post.dto';

export class CreateInstagramPostsCommand extends Command<InstagramPostDto> {
  @IsString() @MaxLength(256) @ApiProperty() image!: string;
  @IsString() @MaxLength(128) @ApiProperty() link!: string;
}
