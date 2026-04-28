import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsDateString, IsNumber, IsOptional, IsString, MaxLength, Min} from 'class-validator';

export class CreateExpensesDto {
  @ApiProperty() @IsNumber() @Min(0) amount!: number;
  @ApiProperty() @IsDateString() date!: string;
  @ApiProperty() @IsString() @MaxLength(256) title!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiProperty() @IsString() @MaxLength(64) transactionId!: string;
}
