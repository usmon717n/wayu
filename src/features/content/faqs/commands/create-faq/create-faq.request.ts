import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";
import {CreateFaqCommand} from "./create-faq.command";

export class CreateFaqRequest {
    @IsString()
    @MaxLength(256)
    @ApiProperty()
    question!: string;

    @IsString()
    @MaxLength(512)
    @ApiProperty()
    answer!: string;

    toCommand(): CreateFaqCommand {
        const cmd = new CreateFaqCommand();
        cmd.question = this.question;
        cmd.answer = this.answer;
        return cmd;
    }
}
