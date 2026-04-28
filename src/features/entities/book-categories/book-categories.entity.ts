import {Column, Entity} from 'typeorm';
import {BaseModule} from '../../../core/base-module';

@Entity('bookCategories')
export class BookCategoriesEntity extends BaseModule {
  @Column({type: 'varchar', length: 64, unique: true})
  title!: string;
}
