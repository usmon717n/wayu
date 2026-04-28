import {IsInt, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";

export class GetAllNewsCategoriesFilters{
    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    @Type(() => Number)
    page?: number

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    @Type(() => Number)
    size?: number
}