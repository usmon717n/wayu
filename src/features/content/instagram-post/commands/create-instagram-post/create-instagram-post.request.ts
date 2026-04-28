import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";
import {CreateInstagramPostCommand} from "./create-instagram-post.command";

export class CreateInstagramPostRequest {
    @IsString()
    @MaxLength(256)
    @ApiProperty()
    image!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    link!: string;

    toCommand(): CreateInstagramPostCommand {
        const cmd = new CreateInstagramPostCommand();
        cmd.image = this.image;
        cmd.link = this.link;
        return cmd;
    }
}
