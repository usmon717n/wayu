import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {BaseModule} from '../../../core/base-module';
import {NewsCategoriesEntity} from '../news-categories/news-categories.entity';
import {CountriesEntity} from '../countries/countries.entity';

@Entity('news')
export class NewsEntity extends BaseModule {
  @Column({type: 'int'})
  categoryId!: number;

  @ManyToOne(() => NewsCategoriesEntity, {nullable: false})
  @JoinColumn({name: 'categoryId'})
  category!: NewsCategoriesEntity;

  @Column({type: 'int', nullable: true})
  countryId?: number;

  @ManyToOne(() => CountriesEntity, {nullable: true})
  @JoinColumn({name: 'countryId'})
  country?: CountriesEntity;

  @Column({type: 'varchar', length: 256})
  title!: string;

  @Column({type: 'varchar', length: 128})
  image!: string;

  @Column({type: 'date'})
  date!: string;

  @Column({type: 'text'})
  content!: string;
}
