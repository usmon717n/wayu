import {Column, Entity, OneToMany} from 'typeorm';
import type {Relation} from 'typeorm';
import {BaseModel} from '@/core/base-model';
import {NewsTag} from '@/features/content/news-tags/news-tag.entity';
import {FaqsTag} from '@/features/content/faqs-tags/faqs-tag.entity';

@Entity('tags')
export class Tag extends BaseModel {
  @Column({length: 64, unique: true})
  title!: string;

  @OneToMany(() => NewsTag, newsTag => newsTag.tag)
  newsTags?: Relation<NewsTag[]>;

  @OneToMany(() => FaqsTag, faqsTag => faqsTag.tag)
  faqsTags?: Relation<FaqsTag[]>;
}
