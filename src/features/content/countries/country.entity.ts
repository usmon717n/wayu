import {Column, Entity, OneToMany} from 'typeorm';
import type {Relation} from 'typeorm';
import {BaseModel} from '@/core/base-model';
import {Branch} from '@/features/content/branches/branch.entity';

@Entity('countries')
export class Country extends BaseModel {
  @Column({length: 64, unique: true})
  title!: string;

  @Column({length: 128})
  flag!: string;

  @OneToMany(() => Branch, branch => branch.country)
  branches?: Relation<Branch[]>;
}
