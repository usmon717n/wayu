import {NotFoundException} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Branch} from '@/features/content/branches/branch.entity';
import {DeleteBranchesCommand} from './delete-branches.command';
@CommandHandler(DeleteBranchesCommand)
export class DeleteBranchesHandler implements ICommandHandler<DeleteBranchesCommand> {
  async execute(command: DeleteBranchesCommand): Promise<void> {
    const item = await Branch.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Branch with given id not found');
    await Branch.remove(item);
  }
}
