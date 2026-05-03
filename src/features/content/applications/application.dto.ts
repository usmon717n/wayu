import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {ApplicationStatus} from '@/features/content/content.enums';

export class ApplicationDto {
  @Expose() @ApiProperty() id!: number;
  @Expose() @ApiProperty() fullName!: string;
  @Expose() @ApiProperty() phoneNumber!: string;
  @Expose() @ApiProperty() email!: string;
  @Expose() @ApiProperty() vacancyId!: number;
  @Expose() @ApiProperty() resume!: string;
  @Expose() @ApiProperty({enum: ApplicationStatus}) status!: ApplicationStatus;
  @Expose() @ApiProperty() created!: string;
  @Expose() @ApiProperty({required: false}) updated?: string;
}
