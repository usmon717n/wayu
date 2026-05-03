import {NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Branch} from '@/features/content/branches/branch.entity';
import {BranchDto} from '@/features/content/branches/branch.dto';
import {Country} from '@/features/content/countries/country.entity';
import {Representative} from '@/features/content/representatives/representative.entity';
import {CreateBranchesCommand} from './create-branches.command';
@CommandHandler(CreateBranchesCommand)
export class CreateBranchesHandler implements ICommandHandler<CreateBranchesCommand> {
  async execute(command: CreateBranchesCommand): Promise<BranchDto> {
    const countryExists = await Country.existsBy({id: command.countryId});
    if (!countryExists) throw new NotFoundException('Country with given id not found');
    const representativeExists = await Representative.existsBy({id: command.representativeId});
    if (!representativeExists) throw new NotFoundException('Representative with given id not found');
    const item = Branch.create({
      countryId: command.countryId,
      representativeId: command.representativeId,
      city: command.city,
      latitude: command.latitude,
      longitude: command.longitude,
      phoneNumber: command.phoneNumber,
    } as Branch);
    await Branch.save(item);
    return plainToInstance(BranchDto, item, {excludeExtraneousValues: true});
  }
}
