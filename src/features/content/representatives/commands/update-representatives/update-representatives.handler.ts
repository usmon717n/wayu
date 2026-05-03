import {NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Representative} from '@/features/content/representatives/representative.entity';
import {RepresentativeDto} from '@/features/content/representatives/representative.dto';
import {UpdateRepresentativesCommand} from './update-representatives.command';
@CommandHandler(UpdateRepresentativesCommand)
export class UpdateRepresentativesHandler implements ICommandHandler<UpdateRepresentativesCommand> {
  async execute(command: UpdateRepresentativesCommand): Promise<RepresentativeDto> {
    const item = await Representative.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Representative with given id not found');
    Object.assign(item, command);
    await Representative.save(item);
    return plainToInstance(RepresentativeDto, item, {excludeExtraneousValues: true});
  }
}
