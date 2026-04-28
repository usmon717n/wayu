import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class GetAllFaqsTagsResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    faqsId!: number;

    @Expose()
    @ApiProperty()
    tagId!: number;
}
