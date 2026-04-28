import {Column, Entity} from 'typeorm';
import {BaseModule} from '../../../core/base-module';

@Entity('representatives')
export class RepresentativesEntity extends BaseModule {
  @Column({type: 'varchar', length: 64})
  fullName!: string;

  @Column({type: 'varchar', length: 128})
  image!: string;

  @Column({type: 'varchar', length: 64})
  email!: string;

  @Column({type: 'varchar', length: 16})
  phoneNumber!: string;

  @Column({type: 'text'})
  resume!: string;
}
