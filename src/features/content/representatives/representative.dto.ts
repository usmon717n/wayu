import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class RepresentativeDto {
  @Expose() @ApiProperty() id!: number;
  @Expose() @ApiProperty() fullName!: string;
  @Expose() @ApiProperty() image!: string;
  @Expose() @ApiProperty() email!: string;
  @Expose() @ApiProperty() phoneNumber!: string;
  @Expose() @ApiProperty() resume!: string;
  @Expose() @ApiProperty() created!: string;
  @Expose() @ApiProperty({required: false}) updated?: string;
}
