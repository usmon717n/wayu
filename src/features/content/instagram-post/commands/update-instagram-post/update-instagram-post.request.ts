import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";

export class UpdateInstagramPostRequest {
    @IsString()
    @MaxLength(256)
    @ApiProperty()
    image!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    link!: string;
}
