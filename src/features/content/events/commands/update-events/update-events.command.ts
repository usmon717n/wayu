import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {Type} from 'class-transformer';
import {IsDate, IsInt, IsOptional, IsString, MaxLength, Min} from 'class-validator';
import {EventDto} from '@/features/content/events/event.dto';
export class UpdateEventsCommand extends Command<EventDto> {
  id!: number;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) categoryId?: number;
  @IsOptional() @IsString() @MaxLength(256) @ApiProperty({required: false}) title?: string;
  @IsOptional() @IsString() @ApiProperty({required: false}) content?: string;
  @IsOptional() @IsString() @MaxLength(128) @ApiProperty({required: false}) image?: string;
  @IsOptional() @IsDate() @Type(() => Date) @ApiProperty({required: false}) date?: Date;
  @IsOptional() @IsString() @MaxLength(128) @ApiProperty({required: false}) address?: string;
}
