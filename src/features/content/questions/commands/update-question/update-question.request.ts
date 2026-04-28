import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsString, MaxLength} from "class-validator";
import {QuestionStatus} from "../../../../../core/enum/enum";

export class UpdateQuestionRequest {
    @IsString()
    @MaxLength(64)
    @ApiProperty()
    fullName!: string;

    @IsString()
    @MaxLength(16)
    @ApiProperty()
    phoneNumber!: string;

    @IsString()
    @MaxLength(2000)
    @ApiProperty()
    question!: string;

    @IsEnum(QuestionStatus)
    @ApiProperty({enum: QuestionStatus})
    status!: QuestionStatus;
}
