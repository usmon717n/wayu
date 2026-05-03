import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {Type} from 'class-transformer';
import {IsDate, IsInt, IsString, MaxLength, Min} from 'class-validator';
import {EventDto} from '@/features/content/events/event.dto';
export class CreateEventsCommand extends Command<EventDto> {
  @IsInt() @Min(1) @Type(() => Number) @ApiProperty() categoryId!: number;
  @IsString() @MaxLength(256) @ApiProperty() title!: string;
  @IsString() @ApiProperty() content!: string;
  @IsString() @MaxLength(128) @ApiProperty() image!: string;
  @IsDate() @Type(() => Date) @ApiProperty() date!: Date;
  @IsString() @MaxLength(128) @ApiProperty() address!: string;
}
