import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {Type} from 'class-transformer';
import {IsInt, IsNumberString, IsOptional, IsString, MaxLength, Min} from 'class-validator';
import {BranchDto} from '@/features/content/branches/branch.dto';

export class UpdateBranchesCommand extends Command<BranchDto> {
  id!: number;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) countryId?: number;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) representativeId?: number;
  @IsOptional() @IsString() @MaxLength(64) @ApiProperty({required: false}) city?: string;
  @IsOptional() @IsNumberString() @ApiProperty({required: false}) latitude?: string;
  @IsOptional() @IsNumberString() @ApiProperty({required: false}) longitude?: string;
  @IsOptional() @IsString() @MaxLength(16) @ApiProperty({required: false}) phoneNumber?: string;
}
