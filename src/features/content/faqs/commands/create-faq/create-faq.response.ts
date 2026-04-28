import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class CreateFaqResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    question!: string;

    @Expose()
    @ApiProperty()
    answer!: string;
}
