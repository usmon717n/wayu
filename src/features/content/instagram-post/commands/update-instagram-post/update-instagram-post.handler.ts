import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {InstagramPostsEntity} from "../../../../entities/instagramPosts.entity";
import {CreateInstagramPostResponse} from "../create-instagram-post/create-instagram-post.response";
import {UpdateInstagramPostCommand} from "./update-instagram-post.command";

@CommandHandler(UpdateInstagramPostCommand)
export class UpdateInstagramPostHandler implements ICommandHandler<UpdateInstagramPostCommand> {
    async execute(command: UpdateInstagramPostCommand): Promise<CreateInstagramPostResponse> {
        const entity = await InstagramPostsEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("instagram post not found");

        entity.image = command.image;
        entity.link = command.link;
        await InstagramPostsEntity.save(entity);

        return plainToInstance(CreateInstagramPostResponse, entity, {excludeExtraneousValues: true});
    }
}
