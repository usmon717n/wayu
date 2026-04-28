import {GetAllFaqsFilters} from "./get-all-faqs.filters";

export class GetAllFaqsQuery {
    constructor(public readonly filters: GetAllFaqsFilters) {}
}
