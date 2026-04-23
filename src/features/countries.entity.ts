import {BaseModule} from "../core/base-module";
import {Column, Entity} from "typeorm";

@Entity('countries')
export class CountriesEntity extends BaseModule{
    @Column({type: 'varchar', length:64, unique: true})
    title!: string

    @Column({type: 'varchar', length: 64})
    flag!: string
}