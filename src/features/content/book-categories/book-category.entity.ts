import {Column, Entity, OneToMany} from 'typeorm';
import type {Relation} from 'typeorm';
import {BaseModel} from '@/core/base-model';
import {Book} from '@/features/content/books/book.entity';

@Entity('book_categories')
export class BookCategory extends BaseModel {
  @Column({length: 64, unique: true})
  title!: string;

  @OneToMany(() => Book, book => book.category)
  books?: Relation<Book[]>;
}
