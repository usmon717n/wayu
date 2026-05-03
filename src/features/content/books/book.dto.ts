import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class BookDto {
  @Expose() @ApiProperty() id!: number;
  @Expose() @ApiProperty() authorId!: number;
  @Expose() @ApiProperty() categoryId!: number;
  @Expose() @ApiProperty() title!: string;
  @Expose() @ApiProperty() image!: string;
  @Expose() @ApiProperty({required: false, nullable: true}) description?: string;
  @Expose() @ApiProperty() file!: string;
  @Expose() @ApiProperty() pages!: number;
  @Expose() @ApiProperty() year!: number;
  @Expose() @ApiProperty() created!: string;
  @Expose() @ApiProperty({required: false}) updated?: string;
}
