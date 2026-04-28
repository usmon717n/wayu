import {GetAllQuestionsFilters} from "./get-all-questions.filters";

export class GetAllQuestionsQuery {
    constructor(public readonly filters: GetAllQuestionsFilters) {}
}
