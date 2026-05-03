import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class InstagramPostDto {
  @Expose() @ApiProperty() id!: number;
  @Expose() @ApiProperty() image!: string;
  @Expose() @ApiProperty() link!: string;
  @Expose() @ApiProperty() created!: string;
  @Expose() @ApiProperty({required: false}) updated?: string;
}
