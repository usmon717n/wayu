import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class SocialLinkDto {
  @Expose() @ApiProperty() id!: number;
  @Expose() @ApiProperty() title!: string;
  @Expose() @ApiProperty() icon!: string;
  @Expose() @ApiProperty() link!: string;
  @Expose() @ApiProperty() created!: string;
  @Expose() @ApiProperty({required: false}) updated?: string;
}
