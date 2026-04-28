import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class CreateInstagramPostResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    image!: string;

    @Expose()
    @ApiProperty()
    link!: string;
}
