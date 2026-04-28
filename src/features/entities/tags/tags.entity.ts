import {Column, Entity} from 'typeorm';
import {BaseModule} from '../../../core/base-module';

@Entity('tags')
export class TagsEntity extends BaseModule {
  @Column({type: 'varchar', length: 64, unique: true})
  title!: string;
}
