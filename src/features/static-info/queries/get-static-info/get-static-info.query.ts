import {Query} from '@nestjs/cqrs';
import {GetStaticInfoResponse} from './get-static-info.response';

export class GetStaticInfoQuery extends Query<GetStaticInfoResponse> {
  constructor(public readonly id: number) {
    super();
  }
}
