import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class FaqsTagDto {
  @Expose() @ApiProperty() faqsId!: number;
  @Expose() @ApiProperty() tagId!: number;
}
