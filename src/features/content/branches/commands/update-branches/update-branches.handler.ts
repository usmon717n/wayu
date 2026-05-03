import {NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Branch} from '@/features/content/branches/branch.entity';
import {BranchDto} from '@/features/content/branches/branch.dto';
import {Country} from '@/features/content/countries/country.entity';
import {Representative} from '@/features/content/representatives/representative.entity';
import {UpdateBranchesCommand} from './update-branches.command';
@CommandHandler(UpdateBranchesCommand)
export class UpdateBranchesHandler implements ICommandHandler<UpdateBranchesCommand> {
  async execute(command: UpdateBranchesCommand): Promise<BranchDto> {
    const item = await Branch.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Branch with given id not found');
    if (command.countryId !== undefined) {
      const countryExists = await Country.existsBy({id: command.countryId});
      if (!countryExists) throw new NotFoundException('Country with given id not found');
    }
    if (command.representativeId !== undefined) {
      const representativeExists = await Representative.existsBy({id: command.representativeId});
      if (!representativeExists) throw new NotFoundException('Representative with given id not found');
    }
    Object.assign(item, command);
    await Branch.save(item);
    return plainToInstance(BranchDto, item, {excludeExtraneousValues: true});
  }
}
