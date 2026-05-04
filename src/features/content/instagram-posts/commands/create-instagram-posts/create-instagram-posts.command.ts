import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {Allow, IsString, MaxLength} from 'class-validator';
import {InstagramPostDto} from '@/features/content/instagram-posts/instagram-post.dto';

export class CreateInstagramPostsCommand extends Command<InstagramPostDto> {
  @ApiProperty({type: 'string', format: 'binary'}) @Allow() image!: string;
  @IsString() @MaxLength(128) @ApiProperty() link!: string;
}
