import {Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {NewsEntity} from '../news/news.entity';
import {TagsEntity} from '../tags/tags.entity';

@Entity('newsTags')
export class NewsTagsEntity {
  @PrimaryColumn({type: 'int'})
  newsId!: number;

  @ManyToOne(() => NewsEntity, {nullable: false})
  @JoinColumn({name: 'newsId'})
  news!: NewsEntity;

  @PrimaryColumn({type: 'int'})
  tagId!: number;

  @ManyToOne(() => TagsEntity, {nullable: false})
  @JoinColumn({name: 'tagId'})
  tag!: TagsEntity;
}
