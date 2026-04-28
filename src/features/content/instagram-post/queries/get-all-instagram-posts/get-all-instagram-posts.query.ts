import {GetAllInstagramPostsFilters} from "./get-all-instagram-posts.filters";

export class GetAllInstagramPostsQuery {
    constructor(public readonly filters: GetAllInstagramPostsFilters) {}
}
