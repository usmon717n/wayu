import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";

export class UpdateFaqRequest {
    @IsString()
    @MaxLength(256)
    @ApiProperty()
    question!: string;

    @IsString()
    @MaxLength(512)
    @ApiProperty()
    answer!: string;
}
