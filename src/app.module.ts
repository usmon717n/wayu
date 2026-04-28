import {Module} from '@nestjs/common';
import {UsefulLinksModule} from './features/useful-links/useful-links.module';
import {TagsModule} from './features/tags/tags.module';
import {AuthorsModule} from './features/authors/authors.module';
import {BookCategoriesModule} from './features/book-categories/book-categories.module';
import {BooksModule} from './features/books/books.module';
import {EventCategoriesModule} from './features/event-categories/event-categories.module';
import {EventsModule} from './features/events/events.module';
import {NewsCategoriesModule} from './features/news-categories/news-categories.module';
import {NewsModule} from './features/news/news.module';

@Module({
  imports: [
    UsefulLinksModule,
    TagsModule,
    AuthorsModule,
    BookCategoriesModule,
    BooksModule,
    EventCategoriesModule,
    EventsModule,
    NewsCategoriesModule,
    NewsModule,
  ],
})
export class AppModule {}
