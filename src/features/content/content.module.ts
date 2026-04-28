import {Module} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {CountriesController} from "./countries/countries.controller";
import {CreateCountryHandler} from "./countries/commands/create-country/create-country.handler";
import {DeleteCountryHandler} from "./countries/commands/delete-country/delete-country.handler";
import {UpdateCountryHandler} from "./countries/commands/update-country/update-country.handler";
import {GetAllCountriesHandler} from "./countries/queries/get-all-countries/get-all-countries.handler";
import {GetCountryByIdHandler} from "./countries/queries/get-country-by-id/get-country-by-id.handler";
import {EventController} from "./event/event.controller";
import {CreateEventHandler} from "./event/commands/create-event/create-event.handler";
import {DeleteEventHandler} from "./event/commands/delete-event/delete-event.handler";
import {UpdateEventHandler} from "./event/commands/update-event/update-event.handler";
import {GetAllEventsHandler} from "./event/queries/get-all-events/get-all-events.handler";
import {GetEventByIdHandler} from "./event/queries/get-event-by-id/get-event-by-id.handler";
import {FaqsController} from "./faqs/faqs.controller";
import {CreateFaqHandler} from "./faqs/commands/create-faq/create-faq.handler";
import {DeleteFaqHandler} from "./faqs/commands/delete-faq/delete-faq.handler";
import {UpdateFaqHandler} from "./faqs/commands/update-faq/update-faq.handler";
import {GetAllFaqsHandler} from "./faqs/queries/get-all-faqs/get-all-faqs.handler";
import {GetFaqByIdHandler} from "./faqs/queries/get-faq-by-id/get-faq-by-id.handler";
import {FaqsTagsController} from "./faqs-tags/faqs-tags.controller";
import {CreateFaqsTagHandler} from "./faqs-tags/commands/create-faqs-tag/create-faqs-tag.handler";
import {DeleteFaqsTagHandler} from "./faqs-tags/commands/delete-faqs-tag/delete-faqs-tag.handler";
import {UpdateFaqsTagHandler} from "./faqs-tags/commands/update-faqs-tag/update-faqs-tag.handler";
import {GetAllFaqsTagsHandler} from "./faqs-tags/queries/get-all-faqs-tags/get-all-faqs-tags.handler";
import {GetFaqsTagByIdHandler} from "./faqs-tags/queries/get-faqs-tag-by-id/get-faqs-tag-by-id.handler";
import {InstagramPostController} from "./instagram-post/instagram-post.controller";
import {CreateInstagramPostHandler} from "./instagram-post/commands/create-instagram-post/create-instagram-post.handler";
import {DeleteInstagramPostHandler} from "./instagram-post/commands/delete-instagram-post/delete-instagram-post.handler";
import {UpdateInstagramPostHandler} from "./instagram-post/commands/update-instagram-post/update-instagram-post.handler";
import {GetAllInstagramPostsHandler} from "./instagram-post/queries/get-all-instagram-posts/get-all-instagram-posts.handler";
import {GetInstagramPostByIdHandler} from "./instagram-post/queries/get-instagram-post-by-id/get-instagram-post-by-id.handler";
import {QuestionsController} from "./questions/questions.controller";
import {CreateQuestionHandler} from "./questions/commands/create-question/create-question.handler";
import {DeleteQuestionHandler} from "./questions/commands/delete-question/delete-question.handler";
import {UpdateQuestionHandler} from "./questions/commands/update-question/update-question.handler";
import {GetAllQuestionsHandler} from "./questions/queries/get-all-questions/get-all-questions.handler";
import {GetQuestionByIdHandler} from "./questions/queries/get-question-by-id/get-question-by-id.handler";

@Module({
    imports: [CqrsModule],
    controllers: [InstagramPostController, FaqsController, FaqsTagsController, QuestionsController, CountriesController, EventController],
    providers: [
        CreateInstagramPostHandler,
        UpdateInstagramPostHandler,
        DeleteInstagramPostHandler,
        GetAllInstagramPostsHandler,
        GetInstagramPostByIdHandler,
        CreateFaqHandler,
        UpdateFaqHandler,
        DeleteFaqHandler,
        GetAllFaqsHandler,
        GetFaqByIdHandler,
        CreateFaqsTagHandler,
        UpdateFaqsTagHandler,
        DeleteFaqsTagHandler,
        GetAllFaqsTagsHandler,
        GetFaqsTagByIdHandler,
        CreateQuestionHandler,
        UpdateQuestionHandler,
        DeleteQuestionHandler,
        GetAllQuestionsHandler,
        GetQuestionByIdHandler,
        CreateCountryHandler,
        UpdateCountryHandler,
        DeleteCountryHandler,
        GetAllCountriesHandler,
        GetCountryByIdHandler,
        CreateEventHandler,
        UpdateEventHandler,
        DeleteEventHandler,
        GetAllEventsHandler,
        GetEventByIdHandler,
    ],
})
export class ContentModule {}
