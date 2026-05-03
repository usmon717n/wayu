import {Column, Entity, OneToMany} from 'typeorm';
import type {Relation} from 'typeorm';
import {BaseModel} from '@/core/base-model';
import {Event} from '@/features/content/events/event.entity';

@Entity('event_categories')
export class EventCategory extends BaseModel {
  @Column({length: 64, unique: true})
  title!: string;

  @OneToMany(() => Event, event => event.category)
  events?: Relation<Event[]>;
}
