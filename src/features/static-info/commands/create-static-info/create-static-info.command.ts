import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {IsOptional, IsString, MaxLength} from 'class-validator';
import {CreateStaticInfoResponse} from './create-static-info.response';

export class CreateStaticInfoCommand extends Command<CreateStaticInfoResponse> {
  @IsOptional()
  @IsString()
  @MaxLength(128)
  @ApiProperty({required: false})
  appStoreLink?: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  @ApiProperty({required: false})
  playMarketLink?: string;

  @IsString()
  @ApiProperty()
  aboutUs!: string;
}
