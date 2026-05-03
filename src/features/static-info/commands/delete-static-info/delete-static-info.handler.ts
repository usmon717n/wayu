import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {NotFoundException} from '@nestjs/common';
import {DeleteStaticInfoCommand} from './delete-static-info.command';
import {StaticInfo} from '@/features/static-info/static-info.entity';

@CommandHandler(DeleteStaticInfoCommand)
export class DeleteStaticInfoHandler implements ICommandHandler<DeleteStaticInfoCommand> {
  async execute(command: DeleteStaticInfoCommand): Promise<void> {
    const staticInfo = await StaticInfo.findOneBy({id: command.id});
    if (!staticInfo) {
      throw new NotFoundException('StaticInfo with given id not found');
    }

    await StaticInfo.remove(staticInfo);
  }
}
