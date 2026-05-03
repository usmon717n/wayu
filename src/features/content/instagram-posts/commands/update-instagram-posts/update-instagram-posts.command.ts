import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {IsOptional, IsString, MaxLength} from 'class-validator';
import {InstagramPostDto} from '@/features/content/instagram-posts/instagram-post.dto';

export class UpdateInstagramPostsCommand extends Command<InstagramPostDto> {
  id!: number;
  @IsOptional() @IsString() @MaxLength(256) @ApiProperty({required: false}) image?: string;
  @IsOptional() @IsString() @MaxLength(128) @ApiProperty({required: false}) link?: string;
}
