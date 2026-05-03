import {Module} from '@nestjs/common';
import {StaticInfoController} from '@/features/static-info/static-info.controller';
import {CreateStaticInfoHandler} from '@/features/static-info/commands/create-static-info/create-static-info.handler';
import {UpdateStaticInfoHandler} from '@/features/static-info/commands/update-static-info/update-static-info.handler';
import {DeleteStaticInfoHandler} from '@/features/static-info/commands/delete-static-info/delete-static-info.handler';
import {GetStaticInfoHandler} from '@/features/static-info/queries/get-static-info/get-static-info.handler';
import {GetAllStaticInfoHandler} from '@/features/static-info/queries/get-all-static-info/get-all-static-info.handler';

@Module({
  controllers: [StaticInfoController],
  providers: [
    CreateStaticInfoHandler,
    UpdateStaticInfoHandler,
    DeleteStaticInfoHandler,
    GetStaticInfoHandler,
    GetAllStaticInfoHandler,
  ],
})
export class StaticInfoModule {}
