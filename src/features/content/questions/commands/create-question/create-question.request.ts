import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsOptional, IsString, MaxLength} from "class-validator";
import {QuestionStatus} from "../../../../../core/enum/enum";
import {CreateQuestionCommand} from "./create-question.command";

export class CreateQuestionRequest {
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
    @IsOptional()
    @ApiProperty({enum: QuestionStatus, required: false})
    status?: QuestionStatus;

    toCommand(): CreateQuestionCommand {
        const cmd = new CreateQuestionCommand();
        cmd.fullName = this.fullName;
        cmd.phoneNumber = this.phoneNumber;
        cmd.question = this.question;
        cmd.status = this.status ?? QuestionStatus.PENDING;
        return cmd;
    }
}
