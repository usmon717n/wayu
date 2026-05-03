import {BaseEntity, Entity, ManyToOne, PrimaryColumn} from 'typeorm';
import type {Relation} from 'typeorm';
import {Faq} from '@/features/content/faqs/faq.entity';
import {Tag} from '@/features/content/tags/tag.entity';

@Entity('faqs_tags')
export class FaqsTag extends BaseEntity {
  @PrimaryColumn()
  faqsId!: number;

  @PrimaryColumn()
  tagId!: number;

  @ManyToOne(() => Faq, faq => faq.faqsTags, {onDelete: 'CASCADE'})
  faq?: Relation<Faq>;

  @ManyToOne(() => Tag, tag => tag.faqsTags, {onDelete: 'CASCADE'})
  tag?: Relation<Tag>;
}
