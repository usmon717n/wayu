import {Column, Entity, OneToMany} from 'typeorm';
import type {Relation} from 'typeorm';
import {BaseModel} from '@/core/base-model';
import {VacancyType} from '@/features/content/content.enums';
import {Application} from '@/features/content/applications/application.entity';

@Entity('vacancies')
export class Vacancy extends BaseModel {
  @Column({length: 256})
  title!: string;

  @Column({length: 128})
  address!: string;

  @Column({type: 'text'})
  description!: string;

  @Column({length: 16})
  phoneNumber!: string;

  @Column({type: 'enum', enum: VacancyType})
  type!: VacancyType;

  @Column({length: 64})
  salary!: string;

  @Column({default: true})
  isActive!: boolean;

  @OneToMany(() => Application, application => application.vacancy)
  applications?: Relation<Application[]>;
}
