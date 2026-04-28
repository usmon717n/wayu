import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateNewsCommand} from "./create-news.command";
import {NewsEntity} from "../../news.entity";
import {ILike} from "typeorm";
import {BadRequestException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {CreateNewsResponse} from "./create-news.response";

@CommandHandler(CreateNewsCommand)
export class CreateNewsHandler implements ICommandHandler<CreateNewsCommand>{

    async execute(command: CreateNewsCommand): Promise<CreateNewsResponse>{
        const alreadyExists = await NewsEntity.existsBy({title: ILike(command.title)})
        if(alreadyExists)
            throw new BadRequestException("title is already taken")

        const newNews = NewsEntity.create({title: command.title} as NewsEntity)
        await NewsEntity.save(newNews)

        return plainToInstance(CreateNewsResponse, newNews, {excludeExtraneousValues: true})
    }
}