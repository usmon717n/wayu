import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsDateString, IsInt, IsString, MaxLength} from "class-validator";
import {CreateEventCommand} from "./create-event.command";

export class CreateEventRequest {
    @IsString()
    @MaxLength(256)
    @ApiProperty()
    title!: string;

    @IsString()
    @ApiProperty()
    content!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    image!: string;

    @IsDateString()
    @ApiProperty({example: "2026-05-01T10:00:00.000Z"})
    date!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    address!: string;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    eventcategoryId!: number;

    toCommand(): CreateEventCommand {
        const cmd = new CreateEventCommand();
        cmd.title = this.title;
        cmd.content = this.content;
        cmd.image = this.image;
        cmd.date = new Date(this.date);
        cmd.address = this.address;
        cmd.eventcategoryId = this.eventcategoryId;
        return cmd;
    }
}
