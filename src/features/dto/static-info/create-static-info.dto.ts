import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsOptional, IsString, MaxLength} from 'class-validator';

export class CreateStaticInfoDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(128) appStoreLink?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(128) playMarketLink?: string;
  @ApiProperty() @IsString() aboutUs!: string;
}
