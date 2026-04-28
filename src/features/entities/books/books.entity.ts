import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {BaseModule} from '../../../core/base-module';
import {AuthorsEntity} from '../authors/authors.entity';
import {BookCategoriesEntity} from '../book-categories/book-categories.entity';

@Entity('books')
export class BooksEntity extends BaseModule {
  @Column({type: 'int'})
  authorId!: number;

  @ManyToOne(() => AuthorsEntity, {nullable: false})
  @JoinColumn({name: 'authorId'})
  author!: AuthorsEntity;

  @Column({type: 'int'})
  categoryId!: number;

  @ManyToOne(() => BookCategoriesEntity, {nullable: false})
  @JoinColumn({name: 'categoryId'})
  category!: BookCategoriesEntity;

  @Column({type: 'varchar', length: 256})
  title!: string;

  @Column({type: 'varchar', length: 128})
  image!: string;

  @Column({type: 'text', nullable: true})
  description?: string;

  @Column({type: 'varchar', length: 256})
  file!: string;

  @Column({type: 'int'})
  pages!: number;

  @Column({type: 'int'})
  year!: number;
}
