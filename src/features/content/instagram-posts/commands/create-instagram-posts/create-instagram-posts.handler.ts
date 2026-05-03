import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {InstagramPost} from '@/features/content/instagram-posts/instagram-post.entity';
import {InstagramPostDto} from '@/features/content/instagram-posts/instagram-post.dto';
import {CreateInstagramPostsCommand} from './create-instagram-posts.command';

@CommandHandler(CreateInstagramPostsCommand)
export class CreateInstagramPostsHandler implements ICommandHandler<CreateInstagramPostsCommand> {
  async execute(command: CreateInstagramPostsCommand): Promise<InstagramPostDto> {
    const item = InstagramPost.create({image: command.image, link: command.link} as InstagramPost);
    await InstagramPost.save(item);
    return plainToInstance(InstagramPostDto, item, {excludeExtraneousValues: true});
  }
}
