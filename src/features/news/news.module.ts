import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs"; // 1. CqrsModule'ni import qiling
import { NewsCategoryController } from "./news-category/news-category.controller";
import { CreateNewsCategoryHandler } from "./news-category/commands/create-news-category/create-news-category.handler";
import { GetAllNewsCategoriesHandler } from "./news-category/queries/get-all-news-categories/get-all-news-categories.handler";
import { DeleteNewsCategoryHandler } from "./news-category/commands/delete-news-category/delete-news-category.handler"; // 2. Import qiling
import { NewsController } from "./news/news.controller";
import { GetAllNewsHandler } from "./news/queries/get-all-news/get-all-news.handler";
import { CreateNewsHandler } from "./news/commands/create-news/create-news.handler";

@Module({
    imports: [
        CqrsModule
    ],
    controllers: [
        NewsCategoryController,
        NewsController
    ],
    providers: [
        GetAllNewsCategoriesHandler,
        CreateNewsCategoryHandler,
        DeleteNewsCategoryHandler,
        GetAllNewsHandler,
        CreateNewsHandler,
    ]
})
export class NewsModule {}