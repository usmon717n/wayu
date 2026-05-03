import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {IsOptional, IsString, MaxLength} from 'class-validator';
import {UpdateStaticInfoResponse} from './update-static-info.response';

export class UpdateStaticInfoCommand extends Command<UpdateStaticInfoResponse> {
  id!: number;

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

  @IsOptional()
  @IsString()
  @ApiProperty({required: false})
  aboutUs?: string;
}
