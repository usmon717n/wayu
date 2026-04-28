import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CqrsModule} from '@nestjs/cqrs';
import {NewsCategoriesEntity} from '../entities/news-categories/news-categories.entity';
import {NewsCategoriesController} from './news-categories.controller';
import {NewsCategoriesService} from './news-categories.service';
import {NewsCategoriesRepository} from './news-categories.repository';
import {NewsCategoriesCommandHandlers, NewsCategoriesQueryHandlers} from './news-categories.cqrs';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([NewsCategoriesEntity])],
  controllers: [NewsCategoriesController],
  providers: [NewsCategoriesService, NewsCategoriesRepository, ...NewsCategoriesCommandHandlers, ...NewsCategoriesQueryHandlers],
  exports: [NewsCategoriesService],
})
export class NewsCategoriesModule {}
