import {Column, Entity, ManyToOne} from 'typeorm';
import type {Relation} from 'typeorm';
import {BaseModel} from '@/core/base-model';
import {Country} from '@/features/content/countries/country.entity';
import {Representative} from '@/features/content/representatives/representative.entity';

@Entity('branches')
export class Branch extends BaseModel {
  @Column()
  countryId!: number;

  @ManyToOne(() => Country, country => country.branches, {onDelete: 'RESTRICT'})
  country?: Relation<Country>;

  @Column()
  representativeId!: number;

  @ManyToOne(() => Representative, representative => representative.branches, {onDelete: 'RESTRICT'})
  representative?: Relation<Representative>;

  @Column({length: 64})
  city!: string;

  @Column({type: 'decimal', precision: 10, scale: 7})
  latitude!: string;

  @Column({type: 'decimal', precision: 10, scale: 7})
  longitude!: string;

  @Column({length: 16})
  phoneNumber!: string;
}
