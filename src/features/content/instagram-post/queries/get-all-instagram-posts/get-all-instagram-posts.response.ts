import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class GetAllInstagramPostsResponse {
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
