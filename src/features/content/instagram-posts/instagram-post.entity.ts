import {Column, Entity} from 'typeorm';
import {BaseModel} from '@/core/base-model';

@Entity('instagram_posts')
export class InstagramPost extends BaseModel {
  @Column({length: 256})
  image!: string;

  @Column({length: 128})
  link!: string;
}
