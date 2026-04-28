import {Column, Entity} from "typeorm";
import {BaseModule} from '../../../core/base-module';

@Entity('newsCategories')
export class NewsCategoriesEntity extends BaseModule{
    @Column({type: 'varchar', length: 64, unique: true})
    title!: string
}