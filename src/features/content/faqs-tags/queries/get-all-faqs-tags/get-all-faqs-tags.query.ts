import {GetAllFaqsTagsFilters} from "./get-all-faqs-tags.filters";

export class GetAllFaqsTagsQuery {
    constructor(public readonly filters: GetAllFaqsTagsFilters) {}
}
