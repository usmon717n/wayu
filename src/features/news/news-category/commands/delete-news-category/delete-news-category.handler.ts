import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";

import {BadRequestException, NotFoundException} from "@nestjs/common";
import {DeleteNewsCategoryCommand} from "./delete-news-category.command";
import {NewsEntity} from "../../../news/news.entity";
import {NewsCategoriesEntity} from "../../newsCategories.entity";


@CommandHandler(DeleteNewsCategoryCommand)
export class DeleteNewsCategoryHandler implements ICommandHandler<DeleteNewsCategoryCommand> {
    async execute(cmd: DeleteNewsCategoryCommand): Promise<void> {
        const category = await NewsCategoriesEntity.findOneBy({id: cmd.id});
        if (!category)
            throw new NotFoundException("Category with given id not found");

        const hasAnyAttachedNews = await NewsEntity.existsBy({categoryId: cmd.id});
        if (hasAnyAttachedNews)
            throw new BadRequestException("Category has attached News, move or delete them first");

        await NewsCategoriesEntity.remove(category);
    }
}