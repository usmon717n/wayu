import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {IsString, MaxLength} from 'class-validator';
import {CountryDto} from '@/features/content/countries/country.dto';

export class CreateCountriesCommand extends Command<CountryDto> {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  title!: string;

  @IsString()
  @MaxLength(128)
  @ApiProperty()
  flag!: string;
}
