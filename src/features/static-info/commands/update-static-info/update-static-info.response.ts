import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class UpdateStaticInfoResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty({required: false, nullable: true})
  appStoreLink?: string;

  @Expose()
  @ApiProperty({required: false, nullable: true})
  playMarketLink?: string;

  @Expose()
  @ApiProperty()
  aboutUs!: string;

  @Expose()
  @ApiProperty()
  updated?: string;
}
