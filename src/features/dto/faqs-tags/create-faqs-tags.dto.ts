import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class CreateFaqsTagsDto {
  @ApiProperty() @IsInt() faqsId!: number;
  @ApiProperty() @IsInt() tagId!: number;
}
