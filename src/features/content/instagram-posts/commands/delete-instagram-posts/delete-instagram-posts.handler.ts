import {NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {InstagramPost} from '@/features/content/instagram-posts/instagram-post.entity';
import {DeleteInstagramPostsCommand} from './delete-instagram-posts.command';

@CommandHandler(DeleteInstagramPostsCommand)
export class DeleteInstagramPostsHandler implements ICommandHandler<DeleteInstagramPostsCommand> {
  async execute(command: DeleteInstagramPostsCommand): Promise<void> {
    const item = await InstagramPost.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('InstagramPost with given id not found');
    await InstagramPost.remove(item);
  }
}
