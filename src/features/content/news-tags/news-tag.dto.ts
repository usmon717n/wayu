import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class NewsTagDto {
  @Expose() @ApiProperty() newsId!: number;
  @Expose() @ApiProperty() tagId!: number;
}
