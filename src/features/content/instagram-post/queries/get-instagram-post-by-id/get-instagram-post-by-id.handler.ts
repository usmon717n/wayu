import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {InstagramPostsEntity} from "../../../../entities/instagramPosts.entity";
import {CreateInstagramPostResponse} from "../../commands/create-instagram-post/create-instagram-post.response";
import {GetInstagramPostByIdQuery} from "./get-instagram-post-by-id.query";

@QueryHandler(GetInstagramPostByIdQuery)
export class GetInstagramPostByIdHandler implements IQueryHandler<GetInstagramPostByIdQuery> {
    async execute(query: GetInstagramPostByIdQuery): Promise<CreateInstagramPostResponse> {
        const entity = await InstagramPostsEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("instagram post not found");
        return plainToInstance(CreateInstagramPostResponse, entity, {excludeExtraneousValues: true});
    }
}
