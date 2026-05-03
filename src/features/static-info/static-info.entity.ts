import {Column, Entity} from 'typeorm';
import {BaseModel} from '@/core/base-model';

@Entity('static_info')
export class StaticInfo extends BaseModel {
  @Column({length: 128, nullable: true})
  appStoreLink?: string;

  @Column({length: 128, nullable: true})
  playMarketLink?: string;

  @Column({type: 'text'})
  aboutUs!: string;
}
