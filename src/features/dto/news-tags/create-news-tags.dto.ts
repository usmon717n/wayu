import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';

export class CreateNewsTagsDto {
  @ApiProperty() @IsInt() newsId!: number;
  @ApiProperty() @IsInt() tagId!: number;
}
