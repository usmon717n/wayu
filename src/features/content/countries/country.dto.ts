import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class CountryDto {
  @Expose() @ApiProperty() id!: number;
  @Expose() @ApiProperty() title!: string;
  @Expose() @ApiProperty() flag!: string;
  @Expose() @ApiProperty() created!: string;
  @Expose() @ApiProperty({required: false}) updated?: string;
}
