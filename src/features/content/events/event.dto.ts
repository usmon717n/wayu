import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class EventDto {
  @Expose() @ApiProperty() id!: number;
  @Expose() @ApiProperty() categoryId!: number;
  @Expose() @ApiProperty() title!: string;
  @Expose() @ApiProperty() content!: string;
  @Expose() @ApiProperty() image!: string;
  @Expose() @ApiProperty() date!: Date;
  @Expose() @ApiProperty() address!: string;
  @Expose() @ApiProperty() created!: string;
  @Expose() @ApiProperty({required: false}) updated?: string;
}
