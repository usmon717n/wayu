import {PartialType} from '@nestjs/swagger';
import {CreateDonationsDto} from './create-donations.dto';

export class UpdateDonationsDto extends PartialType(CreateDonationsDto) {}
