import {BadRequestException, NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {ILike} from 'typeorm';
import {plainToInstance} from 'class-transformer';
import {Country} from '@/features/content/countries/country.entity';
import {CountryDto} from '@/features/content/countries/country.dto';
import {UpdateCountriesCommand} from './update-countries.command';

@CommandHandler(UpdateCountriesCommand)
export class UpdateCountriesHandler implements ICommandHandler<UpdateCountriesCommand> {
  async execute(command: UpdateCountriesCommand): Promise<CountryDto> {
    const item = await Country.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Country with given id not found');

    if (command.title !== undefined && command.title.toLowerCase() !== item.title.toLowerCase()) {
      const exists = await Country.existsBy({title: ILike(command.title)});
      if (exists) throw new BadRequestException('Title is already taken');
      item.title = command.title;
    }
    if (command.flag !== undefined) item.flag = command.flag;

    await Country.save(item);
    return plainToInstance(CountryDto, item, {excludeExtraneousValues: true});
  }
}
