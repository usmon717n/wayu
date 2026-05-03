import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class AuthorDto {
  @Expose() @ApiProperty() id!: number;
  @Expose() @ApiProperty() fullName!: string;
  @Expose() @ApiProperty() created!: string;
  @Expose() @ApiProperty({required: false}) updated?: string;
}
