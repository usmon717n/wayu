import {ApiProperty} from '@nestjs/swagger';
import {Command} from '@nestjs/cqrs';
import {Type} from 'class-transformer';
import {IsInt, IsNumberString, IsString, MaxLength, Min} from 'class-validator';
import {BranchDto} from '@/features/content/branches/branch.dto';

export class CreateBranchesCommand extends Command<BranchDto> {
  @IsInt() @Min(1) @Type(() => Number) @ApiProperty() countryId!: number;
  @IsInt() @Min(1) @Type(() => Number) @ApiProperty() representativeId!: number;
  @IsString() @MaxLength(64) @ApiProperty() city!: string;
  @IsNumberString() @ApiProperty() latitude!: string;
  @IsNumberString() @ApiProperty() longitude!: string;
  @IsString() @MaxLength(16) @ApiProperty() phoneNumber!: string;
}
