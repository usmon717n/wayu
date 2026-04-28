import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {InstagramPostsEntity} from "../../../../entities/instagramPosts.entity";
import {CreateInstagramPostCommand} from "./create-instagram-post.command";
import {CreateInstagramPostResponse} from "./create-instagram-post.response";

@CommandHandler(CreateInstagramPostCommand)
export class CreateInstagramPostHandler implements ICommandHandler<CreateInstagramPostCommand> {
    async execute(command: CreateInstagramPostCommand): Promise<CreateInstagramPostResponse> {
        const entity = InstagramPostsEntity.create({image: command.image, link: command.link} as InstagramPostsEntity);
        await InstagramPostsEntity.save(entity);
        return plainToInstance(CreateInstagramPostResponse, entity, {excludeExtraneousValues: true});
    }
}
