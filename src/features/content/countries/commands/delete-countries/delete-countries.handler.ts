import {BadRequestException, NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Country} from '@/features/content/countries/country.entity';
import {Branch} from '@/features/content/branches/branch.entity';
import {DeleteCountriesCommand} from './delete-countries.command';

@CommandHandler(DeleteCountriesCommand)
export class DeleteCountriesHandler implements ICommandHandler<DeleteCountriesCommand> {
  async execute(command: DeleteCountriesCommand): Promise<void> {
    const item = await Country.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Country with given id not found');

    const attached = await Branch.existsBy({countryId: command.id});
    if (attached) throw new BadRequestException('Country has attached branches, move or delete them first');

    await Country.remove(item);
  }
}
