import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeormConfig} from "./configs/typeorm.config";
import {CqrsModule} from "@nestjs/cqrs";
import {NewsModule} from "./features/news/news.module";
import {ContentModule} from "./features/content/content.module";

@Module({
  imports: [
      TypeOrmModule.forRoot(typeormConfig),
      CqrsModule.forRoot(),
      NewsModule,
      ContentModule,
  ],
})
export class AppModule {}
