import {PartialType} from '@nestjs/swagger';
import {CreateApplicationsDto} from './create-applications.dto';

export class UpdateApplicationsDto extends PartialType(CreateApplicationsDto) {}
