import {GetAllEventsFilters} from "./get-all-events.filters";

export class GetAllEventsQuery {
    constructor(public readonly filters: GetAllEventsFilters) {}
}
