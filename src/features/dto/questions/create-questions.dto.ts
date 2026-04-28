import {ApiProperty} from '@nestjs/swagger';
import {IsEnum, IsString, MaxLength} from 'class-validator';
import {QuestionStatus} from '../../../core/enum/enum';

export class CreateQuestionsDto {
  @ApiProperty() @IsString() @MaxLength(64) fullName!: string;
  @ApiProperty() @IsString() @MaxLength(16) phoneNumber!: string;
  @ApiProperty() @IsString() @MaxLength(2000) question!: string;
  @ApiProperty({enum: QuestionStatus}) @IsEnum(QuestionStatus) status!: QuestionStatus;
}
