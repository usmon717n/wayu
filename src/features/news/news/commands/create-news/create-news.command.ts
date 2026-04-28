import {Command} from "@nestjs/cqrs";
import {IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {CreateNewsResponse} from "./create-news.response";

export class CreateNewsCommand extends Command<CreateNewsResponse>{
    @IsString()
    @MaxLength(256)
    @ApiProperty()
    title!: string
}