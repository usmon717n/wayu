import {Module} from '@nestjs/common';

import {CountriesController} from '@/features/content/countries/countries.controller';
import {CreateCountriesHandler} from '@/features/content/countries/commands/create-countries/create-countries.handler';
import {UpdateCountriesHandler} from '@/features/content/countries/commands/update-countries/update-countries.handler';
import {DeleteCountriesHandler} from '@/features/content/countries/commands/delete-countries/delete-countries.handler';
import {GetCountriesByIdHandler} from '@/features/content/countries/queries/get-countries-by-id/get-countries-by-id.handler';
import {GetAllCountriesHandler} from '@/features/content/countries/queries/get-all-countries/get-all-countries.handler';

import {SocialLinksController} from '@/features/content/social-links/social-links.controller';
import {CreateSocialLinksHandler} from '@/features/content/social-links/commands/create-social-links/create-social-links.handler';
import {UpdateSocialLinksHandler} from '@/features/content/social-links/commands/update-social-links/update-social-links.handler';
import {DeleteSocialLinksHandler} from '@/features/content/social-links/commands/delete-social-links/delete-social-links.handler';
import {GetSocialLinksByIdHandler} from '@/features/content/social-links/queries/get-social-links-by-id/get-social-links-by-id.handler';
import {GetAllSocialLinksHandler} from '@/features/content/social-links/queries/get-all-social-links/get-all-social-links.handler';

import {UsefulLinksController} from '@/features/content/useful-links/useful-links.controller';
import {CreateUsefulLinksHandler} from '@/features/content/useful-links/commands/create-useful-links/create-useful-links.handler';
import {UpdateUsefulLinksHandler} from '@/features/content/useful-links/commands/update-useful-links/update-useful-links.handler';
import {DeleteUsefulLinksHandler} from '@/features/content/useful-links/commands/delete-useful-links/delete-useful-links.handler';
import {GetUsefulLinksByIdHandler} from '@/features/content/useful-links/queries/get-useful-links-by-id/get-useful-links-by-id.handler';
import {GetAllUsefulLinksHandler} from '@/features/content/useful-links/queries/get-all-useful-links/get-all-useful-links.handler';

import {RepresentativesController} from '@/features/content/representatives/representatives.controller';
import {CreateRepresentativesHandler} from '@/features/content/representatives/commands/create-representatives/create-representatives.handler';
import {UpdateRepresentativesHandler} from '@/features/content/representatives/commands/update-representatives/update-representatives.handler';
import {DeleteRepresentativesHandler} from '@/features/content/representatives/commands/delete-representatives/delete-representatives.handler';
import {GetRepresentativesByIdHandler} from '@/features/content/representatives/queries/get-representatives-by-id/get-representatives-by-id.handler';
import {GetAllRepresentativesHandler} from '@/features/content/representatives/queries/get-all-representatives/get-all-representatives.handler';

import {BranchesController} from '@/features/content/branches/branches.controller';
import {CreateBranchesHandler} from '@/features/content/branches/commands/create-branches/create-branches.handler';
import {UpdateBranchesHandler} from '@/features/content/branches/commands/update-branches/update-branches.handler';
import {DeleteBranchesHandler} from '@/features/content/branches/commands/delete-branches/delete-branches.handler';
import {GetBranchesByIdHandler} from '@/features/content/branches/queries/get-branches-by-id/get-branches-by-id.handler';
import {GetAllBranchesHandler} from '@/features/content/branches/queries/get-all-branches/get-all-branches.handler';

import {EventCategoriesController} from '@/features/content/event-categories/event-categories.controller';
import {CreateEventCategoriesHandler} from '@/features/content/event-categories/commands/create-event-categories/create-event-categories.handler';
import {UpdateEventCategoriesHandler} from '@/features/content/event-categories/commands/update-event-categories/update-event-categories.handler';
import {DeleteEventCategoriesHandler} from '@/features/content/event-categories/commands/delete-event-categories/delete-event-categories.handler';
import {GetEventCategoriesByIdHandler} from '@/features/content/event-categories/queries/get-event-categories-by-id/get-event-categories-by-id.handler';
import {GetAllEventCategoriesHandler} from '@/features/content/event-categories/queries/get-all-event-categories/get-all-event-categories.handler';

import {EventsController} from '@/features/content/events/events.controller';
import {CreateEventsHandler} from '@/features/content/events/commands/create-events/create-events.handler';
import {UpdateEventsHandler} from '@/features/content/events/commands/update-events/update-events.handler';
import {DeleteEventsHandler} from '@/features/content/events/commands/delete-events/delete-events.handler';
import {GetEventsByIdHandler} from '@/features/content/events/queries/get-events-by-id/get-events-by-id.handler';
import {GetAllEventsHandler} from '@/features/content/events/queries/get-all-events/get-all-events.handler';

import {TagsController} from '@/features/content/tags/tags.controller';
import {CreateTagsHandler} from '@/features/content/tags/commands/create-tags/create-tags.handler';
import {UpdateTagsHandler} from '@/features/content/tags/commands/update-tags/update-tags.handler';
import {DeleteTagsHandler} from '@/features/content/tags/commands/delete-tags/delete-tags.handler';
import {GetTagsByIdHandler} from '@/features/content/tags/queries/get-tags-by-id/get-tags-by-id.handler';
import {GetAllTagsHandler} from '@/features/content/tags/queries/get-all-tags/get-all-tags.handler';

import {NewsTagsController} from '@/features/content/news-tags/news-tags.controller';
import {CreateNewsTagsHandler} from '@/features/content/news-tags/commands/create-news-tags/create-news-tags.handler';
import {DeleteNewsTagsHandler} from '@/features/content/news-tags/commands/delete-news-tags/delete-news-tags.handler';
import {GetNewsTagsByKeysHandler} from '@/features/content/news-tags/queries/get-news-tags-by-keys/get-news-tags-by-keys.handler';
import {GetAllNewsTagsHandler} from '@/features/content/news-tags/queries/get-all-news-tags/get-all-news-tags.handler';

import {InstagramPostsController} from '@/features/content/instagram-posts/instagram-posts.controller';
import {CreateInstagramPostsHandler} from '@/features/content/instagram-posts/commands/create-instagram-posts/create-instagram-posts.handler';
import {UpdateInstagramPostsHandler} from '@/features/content/instagram-posts/commands/update-instagram-posts/update-instagram-posts.handler';
import {DeleteInstagramPostsHandler} from '@/features/content/instagram-posts/commands/delete-instagram-posts/delete-instagram-posts.handler';
import {GetInstagramPostsByIdHandler} from '@/features/content/instagram-posts/queries/get-instagram-posts-by-id/get-instagram-posts-by-id.handler';
import {GetAllInstagramPostsHandler} from '@/features/content/instagram-posts/queries/get-all-instagram-posts/get-all-instagram-posts.handler';

import {FaqsController} from '@/features/content/faqs/faqs.controller';
import {CreateFaqsHandler} from '@/features/content/faqs/commands/create-faqs/create-faqs.handler';
import {UpdateFaqsHandler} from '@/features/content/faqs/commands/update-faqs/update-faqs.handler';
import {DeleteFaqsHandler} from '@/features/content/faqs/commands/delete-faqs/delete-faqs.handler';
import {GetFaqsByIdHandler} from '@/features/content/faqs/queries/get-faqs-by-id/get-faqs-by-id.handler';
import {GetAllFaqsHandler} from '@/features/content/faqs/queries/get-all-faqs/get-all-faqs.handler';

import {FaqsTagsController} from '@/features/content/faqs-tags/faqs-tags.controller';
import {CreateFaqsTagsHandler} from '@/features/content/faqs-tags/commands/create-faqs-tags/create-faqs-tags.handler';
import {DeleteFaqsTagsHandler} from '@/features/content/faqs-tags/commands/delete-faqs-tags/delete-faqs-tags.handler';
import {GetFaqsTagsByKeysHandler} from '@/features/content/faqs-tags/queries/get-faqs-tags-by-keys/get-faqs-tags-by-keys.handler';
import {GetAllFaqsTagsHandler} from '@/features/content/faqs-tags/queries/get-all-faqs-tags/get-all-faqs-tags.handler';

import {QuestionsController} from '@/features/content/questions/questions.controller';
import {CreateQuestionHandler, DeleteQuestionHandler, GetAllQuestionsHandler, GetQuestionByIdHandler, UpdateQuestionHandler} from '@/features/content/questions/question.cqrs';
import {VacanciesController} from '@/features/content/vacancies/vacancies.controller';
import {CreateVacancyHandler, DeleteVacancyHandler, GetAllVacanciesHandler, GetVacancyByIdHandler, UpdateVacancyHandler} from '@/features/content/vacancies/vacancy.cqrs';
import {ApplicationsController} from '@/features/content/applications/applications.controller';
import {CreateApplicationHandler, DeleteApplicationHandler, GetAllApplicationsHandler, GetApplicationByIdHandler, UpdateApplicationHandler} from '@/features/content/applications/application.cqrs';
import {AuthorsController} from '@/features/content/authors/authors.controller';
import {CreateAuthorHandler, DeleteAuthorHandler, GetAllAuthorsHandler, GetAuthorByIdHandler, UpdateAuthorHandler} from '@/features/content/authors/author.cqrs';
import {LanguagesController} from '@/features/content/languages/languages.controller';
import {CreateLanguageHandler, DeleteLanguageHandler, GetAllLanguagesHandler, GetLanguageByIdHandler, UpdateLanguageHandler} from '@/features/content/languages/language.cqrs';
import {BookCategoriesController} from '@/features/content/book-categories/book-categories.controller';
import {CreateBookCategoryHandler, DeleteBookCategoryHandler, GetAllBookCategoriesHandler, GetBookCategoryByIdHandler, UpdateBookCategoryHandler} from '@/features/content/book-categories/book-category.cqrs';
import {BooksController} from '@/features/content/books/books.controller';
import {CreateBookHandler, DeleteBookHandler, GetAllBooksHandler, GetBookByIdHandler, UpdateBookHandler} from '@/features/content/books/book.cqrs';

@Module({
  controllers: [
    CountriesController,
    SocialLinksController,
    UsefulLinksController,
    RepresentativesController,
    BranchesController,
    EventCategoriesController,
    EventsController,
    TagsController,
    NewsTagsController,
    InstagramPostsController,
    FaqsController,
    FaqsTagsController,
    QuestionsController,
    VacanciesController,
    ApplicationsController,
    AuthorsController,
    LanguagesController,
    BookCategoriesController,
    BooksController,
  ],
  providers: [
    CreateCountriesHandler, UpdateCountriesHandler, DeleteCountriesHandler, GetCountriesByIdHandler, GetAllCountriesHandler,
    CreateSocialLinksHandler, UpdateSocialLinksHandler, DeleteSocialLinksHandler, GetSocialLinksByIdHandler, GetAllSocialLinksHandler,
    CreateUsefulLinksHandler, UpdateUsefulLinksHandler, DeleteUsefulLinksHandler, GetUsefulLinksByIdHandler, GetAllUsefulLinksHandler,
    CreateRepresentativesHandler, UpdateRepresentativesHandler, DeleteRepresentativesHandler, GetRepresentativesByIdHandler, GetAllRepresentativesHandler,
    CreateBranchesHandler, UpdateBranchesHandler, DeleteBranchesHandler, GetBranchesByIdHandler, GetAllBranchesHandler,
    CreateEventCategoriesHandler, UpdateEventCategoriesHandler, DeleteEventCategoriesHandler, GetEventCategoriesByIdHandler, GetAllEventCategoriesHandler,
    CreateEventsHandler, UpdateEventsHandler, DeleteEventsHandler, GetEventsByIdHandler, GetAllEventsHandler,
    CreateTagsHandler, UpdateTagsHandler, DeleteTagsHandler, GetTagsByIdHandler, GetAllTagsHandler,
    CreateNewsTagsHandler, DeleteNewsTagsHandler, GetNewsTagsByKeysHandler, GetAllNewsTagsHandler,
    CreateInstagramPostsHandler, UpdateInstagramPostsHandler, DeleteInstagramPostsHandler, GetInstagramPostsByIdHandler, GetAllInstagramPostsHandler,
    CreateFaqsHandler, UpdateFaqsHandler, DeleteFaqsHandler, GetFaqsByIdHandler, GetAllFaqsHandler,
    CreateFaqsTagsHandler, DeleteFaqsTagsHandler, GetFaqsTagsByKeysHandler, GetAllFaqsTagsHandler,
    CreateQuestionHandler, UpdateQuestionHandler, DeleteQuestionHandler, GetQuestionByIdHandler, GetAllQuestionsHandler,
    CreateVacancyHandler, UpdateVacancyHandler, DeleteVacancyHandler, GetVacancyByIdHandler, GetAllVacanciesHandler,
    CreateApplicationHandler, UpdateApplicationHandler, DeleteApplicationHandler, GetApplicationByIdHandler, GetAllApplicationsHandler,
    CreateAuthorHandler, UpdateAuthorHandler, DeleteAuthorHandler, GetAuthorByIdHandler, GetAllAuthorsHandler,
    CreateLanguageHandler, UpdateLanguageHandler, DeleteLanguageHandler, GetLanguageByIdHandler, GetAllLanguagesHandler,
    CreateBookCategoryHandler, UpdateBookCategoryHandler, DeleteBookCategoryHandler, GetBookCategoryByIdHandler, GetAllBookCategoriesHandler,
    CreateBookHandler, UpdateBookHandler, DeleteBookHandler, GetBookByIdHandler, GetAllBooksHandler,
  ],
})
export class ContentModule {}
