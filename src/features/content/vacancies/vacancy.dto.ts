import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {VacancyType} from '@/features/content/content.enums';

export class VacancyDto {
  @Expose() @ApiProperty() id!: number;
  @Expose() @ApiProperty() title!: string;
  @Expose() @ApiProperty() address!: string;
  @Expose() @ApiProperty() description!: string;
  @Expose() @ApiProperty() phoneNumber!: string;
  @Expose() @ApiProperty({enum: VacancyType}) type!: VacancyType;
  @Expose() @ApiProperty() salary!: string;
  @Expose() @ApiProperty() isActive!: boolean;
  @Expose() @ApiProperty() created!: string;
  @Expose() @ApiProperty({required: false}) updated?: string;
}
