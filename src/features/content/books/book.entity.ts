import {Column, Entity, ManyToOne} from 'typeorm';
import type {Relation} from 'typeorm';
import {BaseModel} from '@/core/base-model';
import {Author} from '@/features/content/authors/author.entity';
import {BookCategory} from '@/features/content/book-categories/book-category.entity';

@Entity('books')
export class Book extends BaseModel {
  @Column()
  authorId!: number;

  @ManyToOne(() => Author, author => author.books, {onDelete: 'RESTRICT'})
  author?: Relation<Author>;

  @Column()
  categoryId!: number;

  @ManyToOne(() => BookCategory, category => category.books, {onDelete: 'RESTRICT'})
  category?: Relation<BookCategory>;

  @Column({length: 256})
  title!: string;

  @Column({length: 128})
  image!: string;

  @Column({type: 'text', nullable: true})
  description?: string;

  @Column({length: 256})
  file!: string;

  @Column()
  pages!: number;

  @Column()
  year!: number;
}
