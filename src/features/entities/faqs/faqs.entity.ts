import {Column, Entity} from 'typeorm';
import {BaseModule} from '../../../core/base-module';

@Entity('faqs')
export class FaqsEntity extends BaseModule {
  @Column({type: 'varchar', length: 256})
  question!: string;

  @Column({type: 'varchar', length: 512})
  answer!: string;
}
