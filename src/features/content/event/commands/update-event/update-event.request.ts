import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsDateString, IsInt, IsString, MaxLength} from "class-validator";

export class UpdateEventRequest {
    @IsString()
    @MaxLength(256)
    @ApiProperty()
    title!: string;

    @IsString()
    @ApiProperty()
    content!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    image!: string;

    @IsDateString()
    @ApiProperty()
    date!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    address!: string;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    eventcategoryId!: number;
}
