import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class CreateFaqsTagResponse {
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
