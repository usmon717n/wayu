import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsInt, IsOptional} from "class-validator";

export class GetAllEventsFilters {
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
