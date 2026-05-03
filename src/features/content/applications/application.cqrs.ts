import {NotFoundException} from '@nestjs/common';
import {ApiProperty} from '@nestjs/swagger';
import {Command, CommandHandler, ICommandHandler, IQueryHandler, Query, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance, Type} from 'class-transformer';
import {IsEmail, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min} from 'class-validator';
import {ApplicationStatus} from '@/features/content/content.enums';
import {Application} from '@/features/content/applications/application.entity';
import {ApplicationDto} from '@/features/content/applications/application.dto';
import {Vacancy} from '@/features/content/vacancies/vacancy.entity';

export class CreateApplicationCommand extends Command<ApplicationDto> {
  @IsString() @MaxLength(64) @ApiProperty() fullName!: string;
  @IsString() @MaxLength(16) @ApiProperty() phoneNumber!: string;
  @IsEmail() @MaxLength(64) @ApiProperty() email!: string;
  @IsInt() @Min(1) @Type(() => Number) @ApiProperty() vacancyId!: number;
  @IsString() @MaxLength(128) @ApiProperty() resume!: string;
  @IsOptional() @IsEnum(ApplicationStatus) @ApiProperty({required: false, enum: ApplicationStatus, default: ApplicationStatus.Active}) status?: ApplicationStatus;
}

export class UpdateApplicationCommand extends Command<ApplicationDto> {
  id!: number;
  @IsOptional() @IsString() @MaxLength(64) @ApiProperty({required: false}) fullName?: string;
  @IsOptional() @IsString() @MaxLength(16) @ApiProperty({required: false}) phoneNumber?: string;
  @IsOptional() @IsEmail() @MaxLength(64) @ApiProperty({required: false}) email?: string;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) vacancyId?: number;
  @IsOptional() @IsString() @MaxLength(128) @ApiProperty({required: false}) resume?: string;
  @IsOptional() @IsEnum(ApplicationStatus) @ApiProperty({required: false, enum: ApplicationStatus}) status?: ApplicationStatus;
}

export class DeleteApplicationCommand extends Command<void> { constructor(public readonly id: number) { super(); } }
export class GetApplicationByIdQuery extends Query<ApplicationDto> { constructor(public readonly id: number) { super(); } }
export class GetAllApplicationsFilters {
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) vacancyId?: number;
  @IsOptional() @IsEnum(ApplicationStatus) @ApiProperty({required: false, enum: ApplicationStatus}) status?: ApplicationStatus;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) page?: number;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) size?: number;
}
export class GetAllApplicationsQuery extends Query<ApplicationDto[]> { constructor(public readonly filters: GetAllApplicationsFilters) { super(); } }

async function ensureVacancy(vacancyId: number) {
  const exists = await Vacancy.existsBy({id: vacancyId});
  if (!exists) throw new NotFoundException('Vacancy with given id not found');
}

@CommandHandler(CreateApplicationCommand)
export class CreateApplicationHandler implements ICommandHandler<CreateApplicationCommand> {
  async execute(command: CreateApplicationCommand): Promise<ApplicationDto> {
    await ensureVacancy(command.vacancyId);
    const item = Application.create({
      fullName: command.fullName,
      phoneNumber: command.phoneNumber,
      email: command.email,
      vacancyId: command.vacancyId,
      resume: command.resume,
      status: command.status ?? ApplicationStatus.Active,
    } as Application);
    await Application.save(item);
    return plainToInstance(ApplicationDto, item, {excludeExtraneousValues: true});
  }
}

@CommandHandler(UpdateApplicationCommand)
export class UpdateApplicationHandler implements ICommandHandler<UpdateApplicationCommand> {
  async execute(command: UpdateApplicationCommand): Promise<ApplicationDto> {
    const item = await Application.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Application with given id not found');
    if (command.vacancyId !== undefined) await ensureVacancy(command.vacancyId);
    Object.assign(item, command);
    await Application.save(item);
    return plainToInstance(ApplicationDto, item, {excludeExtraneousValues: true});
  }
}

@CommandHandler(DeleteApplicationCommand)
export class DeleteApplicationHandler implements ICommandHandler<DeleteApplicationCommand> {
  async execute(command: DeleteApplicationCommand): Promise<void> {
    const item = await Application.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Application with given id not found');
    await Application.remove(item);
  }
}

@QueryHandler(GetApplicationByIdQuery)
export class GetApplicationByIdHandler implements IQueryHandler<GetApplicationByIdQuery> {
  async execute(query: GetApplicationByIdQuery): Promise<ApplicationDto> {
    const item = await Application.findOneBy({id: query.id});
    if (!item) throw new NotFoundException('Application with given id not found');
    return plainToInstance(ApplicationDto, item, {excludeExtraneousValues: true});
  }
}

@QueryHandler(GetAllApplicationsQuery)
export class GetAllApplicationsHandler implements IQueryHandler<GetAllApplicationsQuery> {
  async execute(query: GetAllApplicationsQuery): Promise<ApplicationDto[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const where: {vacancyId?: number; status?: ApplicationStatus} = {};
    if (query.filters.vacancyId !== undefined) where.vacancyId = query.filters.vacancyId;
    if (query.filters.status !== undefined) where.status = query.filters.status;
    const items = await Application.find({where, skip: (page - 1) * take, take, order: {id: 'DESC'}});
    return plainToInstance(ApplicationDto, items, {excludeExtraneousValues: true});
  }
}
