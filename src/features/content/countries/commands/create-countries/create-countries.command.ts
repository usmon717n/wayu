import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {Allow, IsString, MaxLength} from 'class-validator';
import {CountryDto} from '@/features/content/countries/country.dto';

export class CreateCountriesCommand extends Command<CountryDto> {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  title!: string;

  @ApiProperty({type: 'string', format: 'binary'})
  @Allow()
  flag!: string;
}
