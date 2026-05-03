import {Column, Entity, ManyToOne} from 'typeorm';
import type {Relation} from 'typeorm';
import {BaseModel} from '@/core/base-model';
import {ApplicationStatus} from '@/features/content/content.enums';
import {Vacancy} from '@/features/content/vacancies/vacancy.entity';

@Entity('applications')
export class Application extends BaseModel {
  @Column({length: 64})
  fullName!: string;

  @Column({length: 16})
  phoneNumber!: string;

  @Column({length: 64})
  email!: string;

  @Column()
  vacancyId!: number;

  @ManyToOne(() => Vacancy, vacancy => vacancy.applications, {onDelete: 'RESTRICT'})
  vacancy?: Relation<Vacancy>;

  @Column({length: 128})
  resume!: string;

  @Column({type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.Active})
  status!: ApplicationStatus;
}
