import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {plainToInstance} from 'class-transformer';
import {CreateStaticInfoCommand} from './create-static-info.command';
import {CreateStaticInfoResponse} from './create-static-info.response';
import {StaticInfo} from '@/features/static-info/static-info.entity';

@CommandHandler(CreateStaticInfoCommand)
export class CreateStaticInfoHandler implements ICommandHandler<CreateStaticInfoCommand> {
  async execute(command: CreateStaticInfoCommand): Promise<CreateStaticInfoResponse> {
    const staticInfo = StaticInfo.create({
      appStoreLink: command.appStoreLink,
      playMarketLink: command.playMarketLink,
      aboutUs: command.aboutUs,
    } as StaticInfo);

    await StaticInfo.save(staticInfo);

    return plainToInstance(CreateStaticInfoResponse, staticInfo, {excludeExtraneousValues: true});
  }
}
