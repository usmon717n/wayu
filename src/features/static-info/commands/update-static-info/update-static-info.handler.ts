import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {NotFoundException} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';
import {StaticInfo} from '@/features/static-info/static-info.entity';
import {UpdateStaticInfoCommand} from './update-static-info.command';
import {UpdateStaticInfoResponse} from './update-static-info.response';

@CommandHandler(UpdateStaticInfoCommand)
export class UpdateStaticInfoHandler implements ICommandHandler<UpdateStaticInfoCommand> {
  async execute(command: UpdateStaticInfoCommand): Promise<UpdateStaticInfoResponse> {
    const staticInfo = await StaticInfo.findOneBy({id: command.id});
    if (!staticInfo) {
      throw new NotFoundException('StaticInfo with given id not found');
    }

    if (command.appStoreLink !== undefined) {
      staticInfo.appStoreLink = command.appStoreLink;
    }

    if (command.playMarketLink !== undefined) {
      staticInfo.playMarketLink = command.playMarketLink;
    }

    if (command.aboutUs !== undefined) {
      staticInfo.aboutUs = command.aboutUs;
    }

    await StaticInfo.save(staticInfo);

    return plainToInstance(UpdateStaticInfoResponse, staticInfo, {excludeExtraneousValues: true});
  }
}
