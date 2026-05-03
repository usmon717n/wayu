import {BaseEntity, Entity, ManyToOne, PrimaryColumn} from 'typeorm';
import type {Relation} from 'typeorm';
import {News} from '@/features/news/news/news.entity';
import {Tag} from '@/features/content/tags/tag.entity';

@Entity('news_tags')
export class NewsTag extends BaseEntity {
  @PrimaryColumn()
  newsId!: number;

  @PrimaryColumn()
  tagId!: number;

  @ManyToOne(() => News, {onDelete: 'CASCADE'})
  news?: Relation<News>;

  @ManyToOne(() => Tag, tag => tag.newsTags, {onDelete: 'CASCADE'})
  tag?: Relation<Tag>;
}
