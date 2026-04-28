import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsInt} from "class-validator";

export class UpdateFaqsTagRequest {
    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    faqsId!: number;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    tagId!: number;
}
