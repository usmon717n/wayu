import {ApiProperty} from '@nestjs/swagger';
import {IsDateString, IsEnum, IsNumber, IsString, MaxLength, Min} from 'class-validator';
import {PaymentProvider} from '../../../core/enum/enum';

export class CreateDonationsDto {
  @ApiProperty() @IsNumber() @Min(0) amount!: number;
  @ApiProperty() @IsString() @MaxLength(64) fullName!: string;
  @ApiProperty() @IsDateString() date!: string;
  @ApiProperty({enum: PaymentProvider}) @IsEnum(PaymentProvider) paidBy!: PaymentProvider;
}
