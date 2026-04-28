import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CqrsModule} from '@nestjs/cqrs';
import {BooksEntity} from '../entities/books/books.entity';
import {AuthorsEntity} from '../entities/authors/authors.entity';
import {BookCategoriesEntity} from '../entities/book-categories/book-categories.entity';
import {BooksController} from './books.controller';
import {BooksService} from './books.service';
import {BooksRepository} from './books.repository';
import {BooksCommandHandlers, BooksQueryHandlers} from './books.cqrs';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([BooksEntity, AuthorsEntity, BookCategoriesEntity])],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, ...BooksCommandHandlers, ...BooksQueryHandlers],
  exports: [BooksService],
})
export class BooksModule {}
