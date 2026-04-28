import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";
import {CreateCountryCommand} from "./create-country.command";

export class CreateCountryRequest {
    @IsString()
    @MaxLength(64)
    @ApiProperty()
    title!: string;

    @IsString()
    @MaxLength(64)
    @ApiProperty()
    flag!: string;

    toCommand(): CreateCountryCommand {
        const cmd = new CreateCountryCommand();
        cmd.title = this.title;
        cmd.flag = this.flag;
        return cmd;
    }
}
