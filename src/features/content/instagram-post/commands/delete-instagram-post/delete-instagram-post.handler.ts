import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {InstagramPostsEntity} from "../../../../entities/instagramPosts.entity";
import {DeleteInstagramPostCommand} from "./delete-instagram-post.command";

@CommandHandler(DeleteInstagramPostCommand)
export class DeleteInstagramPostHandler implements ICommandHandler<DeleteInstagramPostCommand> {
    async execute(command: DeleteInstagramPostCommand): Promise<void> {
        const entity = await InstagramPostsEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("instagram post not found");
        await InstagramPostsEntity.remove(entity);
    }
}
