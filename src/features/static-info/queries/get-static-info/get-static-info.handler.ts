import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {NotFoundException} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';
import {GetStaticInfoQuery} from './get-static-info.query';
import {GetStaticInfoResponse} from './get-static-info.response';
import {StaticInfo} from '@/features/static-info/static-info.entity';

@QueryHandler(GetStaticInfoQuery)
export class GetStaticInfoHandler implements IQueryHandler<GetStaticInfoQuery> {
  async execute(query: GetStaticInfoQuery): Promise<GetStaticInfoResponse> {
    const staticInfo = await StaticInfo.findOneBy({id: query.id});
    if (!staticInfo) {
      throw new NotFoundException('StaticInfo with given id not found');
    }

    return plainToInstance(GetStaticInfoResponse, staticInfo, {excludeExtraneousValues: true});
  }
}
