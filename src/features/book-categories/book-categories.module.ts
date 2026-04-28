import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CqrsModule} from '@nestjs/cqrs';
import {BookCategoriesEntity} from '../entities/book-categories/book-categories.entity';
import {BookCategoriesController} from './book-categories.controller';
import {BookCategoriesService} from './book-categories.service';
import {BookCategoriesRepository} from './book-categories.repository';
import {BookCategoriesCommandHandlers, BookCategoriesQueryHandlers} from './book-categories.cqrs';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([BookCategoriesEntity])],
  controllers: [BookCategoriesController],
  providers: [BookCategoriesService, BookCategoriesRepository, ...BookCategoriesCommandHandlers, ...BookCategoriesQueryHandlers],
  exports: [BookCategoriesService],
})
export class BookCategoriesModule {}
