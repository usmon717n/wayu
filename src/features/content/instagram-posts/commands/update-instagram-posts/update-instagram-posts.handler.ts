import {NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {InstagramPost} from '@/features/content/instagram-posts/instagram-post.entity';
import {InstagramPostDto} from '@/features/content/instagram-posts/instagram-post.dto';
import {UpdateInstagramPostsCommand} from './update-instagram-posts.command';

@CommandHandler(UpdateInstagramPostsCommand)
export class UpdateInstagramPostsHandler implements ICommandHandler<UpdateInstagramPostsCommand> {
  async execute(command: UpdateInstagramPostsCommand): Promise<InstagramPostDto> {
    const item = await InstagramPost.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('InstagramPost with given id not found');
    if (command.image !== undefined) item.image = command.image;
    if (command.link !== undefined) item.link = command.link;
    await InstagramPost.save(item);
    return plainToInstance(InstagramPostDto, item, {excludeExtraneousValues: true});
  }
}
