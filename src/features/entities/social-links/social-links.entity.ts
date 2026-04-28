import {BaseModule} from '../../../core/base-module';
import {Column, Entity} from 'typeorm';

@Entity('socialLinks')
export class SocialLinksEntity extends BaseModule {
  @Column({type: 'varchar', length: 64})
  title!: string;

  @Column({type: 'varchar', length: 128})
  icon!: string;

  @Column({type: 'varchar', length: 128})
  link!: string;
}
