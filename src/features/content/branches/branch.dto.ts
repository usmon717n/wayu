import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class BranchDto {
  @Expose() @ApiProperty() id!: number;
  @Expose() @ApiProperty() countryId!: number;
  @Expose() @ApiProperty() representativeId!: number;
  @Expose() @ApiProperty() city!: string;
  @Expose() @ApiProperty() latitude!: string;
  @Expose() @ApiProperty() longitude!: string;
  @Expose() @ApiProperty() phoneNumber!: string;
  @Expose() @ApiProperty() created!: string;
  @Expose() @ApiProperty({required: false}) updated?: string;
}
