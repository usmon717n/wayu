import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";

export class UpdateCountryRequest {
    @IsString()
    @MaxLength(64)
    @ApiProperty()
    title!: string;

    @IsString()
    @MaxLength(64)
    @ApiProperty()
    flag!: string;
}
