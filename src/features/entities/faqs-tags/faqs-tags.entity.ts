import {Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {FaqsEntity} from '../faqs/faqs.entity';
import {TagsEntity} from '../tags/tags.entity';

@Entity('faqsTags')
export class FaqsTagsEntity {
  @PrimaryColumn({type: 'int'})
  faqsId!: number;

  @ManyToOne(() => FaqsEntity, {nullable: false})
  @JoinColumn({name: 'faqsId'})
  faq!: FaqsEntity;

  @PrimaryColumn({type: 'int'})
  tagId!: number;

  @ManyToOne(() => TagsEntity, {nullable: false})
  @JoinColumn({name: 'tagId'})
  tag!: TagsEntity;
}
