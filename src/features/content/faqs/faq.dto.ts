import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class FaqDto {
  @Expose() @ApiProperty() id!: number;
  @Expose() @ApiProperty() question!: string;
  @Expose() @ApiProperty() answer!: string;
  @Expose() @ApiProperty() created!: string;
  @Expose() @ApiProperty({required: false}) updated?: string;
}
