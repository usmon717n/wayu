import {Column, Entity} from 'typeorm';
import {BaseModule} from '../../../core/base-module';

@Entity('authors')
export class AuthorsEntity extends BaseModule {
  @Column({type: 'varchar', length: 64})
  fullName!: string;
}
