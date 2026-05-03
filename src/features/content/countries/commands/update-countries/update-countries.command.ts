import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {IsOptional, IsString, MaxLength} from 'class-validator';
import {CountryDto} from '@/features/content/countries/country.dto';

export class UpdateCountriesCommand extends Command<CountryDto> {
  id!: number;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  @ApiProperty({required: false})
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  @ApiProperty({required: false})
  flag?: string;
}
