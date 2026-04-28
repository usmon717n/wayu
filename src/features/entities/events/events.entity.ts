import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {BaseModule} from '../../../core/base-module';
import {EventCategoriesEntity} from '../event-categories/event-categories.entity';

@Entity('events')
export class EventsEntity extends BaseModule {
  @Column({type: 'int'})
  categoryId!: number;

  @ManyToOne(() => EventCategoriesEntity, {nullable: false})
  @JoinColumn({name: 'categoryId'})
  category!: EventCategoriesEntity;

  @Column({type: 'varchar', length: 256})
  title!: string;

  @Column({type: 'text'})
  content!: string;

  @Column({type: 'varchar', length: 128})
  image!: string;

  @Column({type: 'timestamp'})
  date!: Date;

  @Column({type: 'varchar', length: 128})
  address!: string;
}
