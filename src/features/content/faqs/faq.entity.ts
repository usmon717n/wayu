import {Column, Entity, OneToMany} from 'typeorm';
import type {Relation} from 'typeorm';
import {BaseModel} from '@/core/base-model';
import {FaqsTag} from '@/features/content/faqs-tags/faqs-tag.entity';

@Entity('faqs')
export class Faq extends BaseModel {
  @Column({length: 256})
  question!: string;

  @Column({length: 512})
  answer!: string;

  @OneToMany(() => FaqsTag, faqsTag => faqsTag.faq)
  faqsTags?: Relation<FaqsTag[]>;
}
