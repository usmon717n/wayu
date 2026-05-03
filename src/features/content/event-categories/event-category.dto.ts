import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class EventCategoryDto {
  @Expose() @ApiProperty() id!: number;
  @Expose() @ApiProperty() title!: string;
  @Expose() @ApiProperty() created!: string;
  @Expose() @ApiProperty({required: false}) updated?: string;
}
