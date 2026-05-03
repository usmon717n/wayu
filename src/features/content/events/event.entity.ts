import {Column, Entity, ManyToOne} from 'typeorm';
import type {Relation} from 'typeorm';
import {BaseModel} from '@/core/base-model';
import {EventCategory} from '@/features/content/event-categories/event-category.entity';

@Entity('events')
export class Event extends BaseModel {
  @Column()
  categoryId!: number;

  @ManyToOne(() => EventCategory, category => category.events, {onDelete: 'RESTRICT'})
  category?: Relation<EventCategory>;

  @Column({length: 256})
  title!: string;

  @Column({type: 'text'})
  content!: string;

  @Column({length: 128})
  image!: string;

  @Column({type: 'timestamp'})
  date!: Date;

  @Column({length: 128})
  address!: string;
}
