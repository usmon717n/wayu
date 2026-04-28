import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {BaseModule} from '../../../core/base-module';
import {CountriesEntity} from '../countries/countries.entity';
import {RepresentativesEntity} from '../representatives/representatives.entity';

@Entity('branches')
export class BranchesEntity extends BaseModule {
  @Column({type: 'int'})
  countryId!: number;

  @ManyToOne(() => CountriesEntity, {nullable: false})
  @JoinColumn({name: 'countryId'})
  country!: CountriesEntity;

  @Column({type: 'int'})
  representativeId!: number;

  @ManyToOne(() => RepresentativesEntity, {nullable: false})
  @JoinColumn({name: 'representativeId'})
  representative!: RepresentativesEntity;

  @Column({type: 'varchar', length: 64})
  city!: string;

  @Column({type: 'decimal', precision: 10, scale: 7})
  latitude!: number;

  @Column({type: 'decimal', precision: 10, scale: 7})
  longitude!: number;

  @Column({type: 'varchar', length: 16})
  phoneNumber!: string;
}
