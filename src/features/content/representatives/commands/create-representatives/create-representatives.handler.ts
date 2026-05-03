import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {Representative} from '@/features/content/representatives/representative.entity';
import {RepresentativeDto} from '@/features/content/representatives/representative.dto';
import {CreateRepresentativesCommand} from './create-representatives.command';
@CommandHandler(CreateRepresentativesCommand)
export class CreateRepresentativesHandler implements ICommandHandler<CreateRepresentativesCommand> {
  async execute(command: CreateRepresentativesCommand): Promise<RepresentativeDto> {
    const item = Representative.create({
      fullName: command.fullName,
      image: command.image,
      email: command.email,
      phoneNumber: command.phoneNumber,
      resume: command.resume,
    } as Representative);
    await Representative.save(item);
    return plainToInstance(RepresentativeDto, item, {excludeExtraneousValues: true});
  }
}
