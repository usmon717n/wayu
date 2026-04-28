import {Column, Entity} from 'typeorm';
import {BaseModule} from '../../../core/base-module';

@Entity('eventCategories')
export class EventCategoriesEntity extends BaseModule {
  @Column({type: 'varchar', length: 64, unique: true})
  title!: string;
}
