import {GetAllCountriesFilters} from "./get-all-countries.filters";

export class GetAllCountriesQuery {
    constructor(public readonly filters: GetAllCountriesFilters) {}
}
