import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsInt, IsOptional} from "class-validator";

export class GetAllFaqsTagsFilters {
    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    @Type(() => Number)
    page?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    @Type(() => Number)
    size?: number;
}
