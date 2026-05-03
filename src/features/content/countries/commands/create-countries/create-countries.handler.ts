import {BadRequestException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {ILike} from 'typeorm';
import {plainToInstance} from 'class-transformer';
import {Country} from '@/features/content/countries/country.entity';
import {CountryDto} from '@/features/content/countries/country.dto';
import {CreateCountriesCommand} from './create-countries.command';

@CommandHandler(CreateCountriesCommand)
export class CreateCountriesHandler implements ICommandHandler<CreateCountriesCommand> {
  async execute(command: CreateCountriesCommand): Promise<CountryDto> {
    const exists = await Country.existsBy({title: ILike(command.title)});
    if (exists) throw new BadRequestException('Title is already taken');

    const item = Country.create({title: command.title, flag: command.flag} as Country);
    await Country.save(item);
    return plainToInstance(CountryDto, item, {excludeExtraneousValues: true});
  }
}
