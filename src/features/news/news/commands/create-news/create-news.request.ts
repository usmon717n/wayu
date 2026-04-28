import {IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {CreateNewsCommand} from "./create-news.command";

export class CreateNewsRequest{
    @IsString()
    @MaxLength(256)
    @ApiProperty()
    title!: string


    public toCommand(): CreateNewsCommand{
        const cmd = new CreateNewsCommand();
        cmd.title = this.title
        return cmd
    }
}