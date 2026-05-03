import {Column, Entity, OneToMany} from 'typeorm';
import type {Relation} from 'typeorm';
import {BaseModel} from '@/core/base-model';
import {Book} from '@/features/content/books/book.entity';

@Entity('authors')
export class Author extends BaseModel {
  @Column({length: 64})
  fullName!: string;

  @OneToMany(() => Book, book => book.author)
  books?: Relation<Book[]>;
}
