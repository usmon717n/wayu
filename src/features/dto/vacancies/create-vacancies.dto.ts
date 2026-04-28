import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsBoolean, IsEnum, IsOptional, IsString, MaxLength} from 'class-validator';
import {VacancyType} from '../../../core/enum/enum';

export class CreateVacanciesDto {
  @ApiProperty() @IsString() @MaxLength(256) title!: string;
  @ApiProperty() @IsString() @MaxLength(128) address!: string;
  @ApiProperty() @IsString() description!: string;
  @ApiProperty() @IsString() @MaxLength(16) phoneNumber!: string;
  @ApiProperty({enum: VacancyType}) @IsEnum(VacancyType) type!: VacancyType;
  @ApiProperty() @IsString() @MaxLength(64) salary!: string;
  @ApiPropertyOptional({default: true}) @IsOptional() @IsBoolean() isActive?: boolean;
}
