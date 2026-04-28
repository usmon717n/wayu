import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CqrsModule} from '@nestjs/cqrs';
import {NewsEntity} from '../entities/news/news.entity';
import {NewsCategoriesEntity} from '../entities/news-categories/news-categories.entity';
import {CountriesEntity} from '../entities/countries/countries.entity';
import {NewsController} from './news.controller';
import {NewsService} from './news.service';
import {NewsRepository} from './news.repository';
import {NewsCommandHandlers, NewsQueryHandlers} from './news.cqrs';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([NewsEntity, NewsCategoriesEntity, CountriesEntity])],
  controllers: [NewsController],
  providers: [NewsService, NewsRepository, ...NewsCommandHandlers, ...NewsQueryHandlers],
  exports: [NewsService],
})
export class NewsModule {}
