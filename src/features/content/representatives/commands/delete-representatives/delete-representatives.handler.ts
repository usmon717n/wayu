import {BadRequestException, NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Representative} from '@/features/content/representatives/representative.entity';
import {Branch} from '@/features/content/branches/branch.entity';
import {DeleteRepresentativesCommand} from './delete-representatives.command';
@CommandHandler(DeleteRepresentativesCommand)
export class DeleteRepresentativesHandler implements ICommandHandler<DeleteRepresentativesCommand> {
  async execute(command: DeleteRepresentativesCommand): Promise<void> {
    const item = await Representative.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Representative with given id not found');
    const attached = await Branch.existsBy({representativeId: command.id});
    if (attached) throw new BadRequestException('Representative has attached branches, move or delete them first');
    await Representative.remove(item);
  }
}
