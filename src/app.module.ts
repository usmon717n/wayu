import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from './configs/typeorm.config';
import {NewsModule} from "@/features/news/news.module";
import {CqrsModule} from "@nestjs/cqrs";
import {StaticInfoModule} from "@/features/static-info/static-info.module";
import {ContentModule} from "@/features/content/content.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CqrsModule.forRoot(),
    NewsModule,
    StaticInfoModule,
    ContentModule,
  ],
})
export class AppModule {
}
