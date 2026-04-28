import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";
import {QuestionStatus} from "../../../../../core/enum/enum";

export class CreateQuestionResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    fullName!: string;

    @Expose()
    @ApiProperty()
    phoneNumber!: string;

    @Expose()
    @ApiProperty()
    question!: string;

    @Expose()
    @ApiProperty({enum: QuestionStatus})
    status!: QuestionStatus;
}
