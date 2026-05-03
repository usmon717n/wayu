import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {QuestionStatus} from '@/features/content/content.enums';

export class QuestionDto {
  @Expose() @ApiProperty() id!: number;
  @Expose() @ApiProperty() fullName!: string;
  @Expose() @ApiProperty() phoneNumber!: string;
  @Expose() @ApiProperty() question!: string;
  @Expose() @ApiProperty({enum: QuestionStatus}) status!: QuestionStatus;
  @Expose() @ApiProperty() created!: string;
  @Expose() @ApiProperty({required: false}) updated?: string;
}
