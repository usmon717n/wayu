import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsEmail, IsEnum, IsInt, IsOptional, IsString, MaxLength} from 'class-validator';
import {ApplicationStatus} from '../../../core/enum/enum';

export class CreateApplicationsDto {
  @ApiProperty() @IsString() @MaxLength(64) fullName!: string;
  @ApiProperty() @IsString() @MaxLength(16) phoneNumber!: string;
  @ApiProperty() @IsEmail() @MaxLength(64) email!: string;
  @ApiProperty() @IsInt() vacancyId!: number;
  @ApiProperty() @IsString() @MaxLength(128) resume!: string;
  @ApiPropertyOptional({enum: ApplicationStatus, default: ApplicationStatus.ACTIVE})
  @IsOptional() @IsEnum(ApplicationStatus) status?: ApplicationStatus;
}
