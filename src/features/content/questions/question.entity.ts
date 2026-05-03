import {Column, Entity} from 'typeorm';
import {BaseModel} from '@/core/base-model';
import {QuestionStatus} from '@/features/content/content.enums';

@Entity('questions')
export class Question extends BaseModel {
  @Column({length: 64})
  fullName!: string;

  @Column({length: 16})
  phoneNumber!: string;

  @Column({length: 2000})
  question!: string;

  @Column({type: 'enum', enum: QuestionStatus})
  status!: QuestionStatus;
}
