import {BadRequestException, NotFoundException} from '@nestjs/common';
import {ApiProperty} from '@nestjs/swagger';
import {Command, CommandHandler, ICommandHandler, IQueryHandler, Query, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance, Type} from 'class-transformer';
import {IsBoolean, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min} from 'class-validator';
import {Application} from '@/features/content/applications/application.entity';
import {VacancyType} from '@/features/content/content.enums';
import {Vacancy} from '@/features/content/vacancies/vacancy.entity';
import {VacancyDto} from '@/features/content/vacancies/vacancy.dto';

export class CreateVacancyCommand extends Command<VacancyDto> {
  @IsString() @MaxLength(256) @ApiProperty() title!: string;
  @IsString() @MaxLength(128) @ApiProperty() address!: string;
  @IsString() @ApiProperty() description!: string;
  @IsString() @MaxLength(16) @ApiProperty() phoneNumber!: string;
  @IsEnum(VacancyType) @ApiProperty({enum: VacancyType}) type!: VacancyType;
  @IsString() @MaxLength(64) @ApiProperty() salary!: string;
  @IsOptional() @IsBoolean() @Type(() => Boolean) @ApiProperty({required: false, default: true}) isActive?: boolean;
}

export class UpdateVacancyCommand extends Command<VacancyDto> {
  id!: number;
  @IsOptional() @IsString() @MaxLength(256) @ApiProperty({required: false}) title?: string;
  @IsOptional() @IsString() @MaxLength(128) @ApiProperty({required: false}) address?: string;
  @IsOptional() @IsString() @ApiProperty({required: false}) description?: string;
  @IsOptional() @IsString() @MaxLength(16) @ApiProperty({required: false}) phoneNumber?: string;
  @IsOptional() @IsEnum(VacancyType) @ApiProperty({required: false, enum: VacancyType}) type?: VacancyType;
  @IsOptional() @IsString() @MaxLength(64) @ApiProperty({required: false}) salary?: string;
  @IsOptional() @IsBoolean() @Type(() => Boolean) @ApiProperty({required: false}) isActive?: boolean;
}

export class DeleteVacancyCommand extends Command<void> { constructor(public readonly id: number) { super(); } }
export class GetVacancyByIdQuery extends Query<VacancyDto> { constructor(public readonly id: number) { super(); } }
export class GetAllVacanciesFilters {
  @IsOptional() @IsBoolean() @Type(() => Boolean) @ApiProperty({required: false}) isActive?: boolean;
  @IsOptional() @IsEnum(VacancyType) @ApiProperty({required: false, enum: VacancyType}) type?: VacancyType;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) page?: number;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) size?: number;
}
export class GetAllVacanciesQuery extends Query<VacancyDto[]> { constructor(public readonly filters: GetAllVacanciesFilters) { super(); } }

@CommandHandler(CreateVacancyCommand)
export class CreateVacancyHandler implements ICommandHandler<CreateVacancyCommand> {
  async execute(command: CreateVacancyCommand): Promise<VacancyDto> {
    const item = Vacancy.create({
      title: command.title,
      address: command.address,
      description: command.description,
      phoneNumber: command.phoneNumber,
      type: command.type,
      salary: command.salary,
      isActive: command.isActive ?? true,
    } as Vacancy);
    await Vacancy.save(item);
    return plainToInstance(VacancyDto, item, {excludeExtraneousValues: true});
  }
}

@CommandHandler(UpdateVacancyCommand)
export class UpdateVacancyHandler implements ICommandHandler<UpdateVacancyCommand> {
  async execute(command: UpdateVacancyCommand): Promise<VacancyDto> {
    const item = await Vacancy.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Vacancy with given id not found');
    Object.assign(item, command);
    await Vacancy.save(item);
    return plainToInstance(VacancyDto, item, {excludeExtraneousValues: true});
  }
}

@CommandHandler(DeleteVacancyCommand)
export class DeleteVacancyHandler implements ICommandHandler<DeleteVacancyCommand> {
  async execute(command: DeleteVacancyCommand): Promise<void> {
    const item = await Vacancy.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Vacancy with given id not found');
    const attached = await Application.existsBy({vacancyId: command.id});
    if (attached) throw new BadRequestException('Vacancy has attached applications, move or delete them first');
    await Vacancy.remove(item);
  }
}

@QueryHandler(GetVacancyByIdQuery)
export class GetVacancyByIdHandler implements IQueryHandler<GetVacancyByIdQuery> {
  async execute(query: GetVacancyByIdQuery): Promise<VacancyDto> {
    const item = await Vacancy.findOneBy({id: query.id});
    if (!item) throw new NotFoundException('Vacancy with given id not found');
    return plainToInstance(VacancyDto, item, {excludeExtraneousValues: true});
  }
}

@QueryHandler(GetAllVacanciesQuery)
export class GetAllVacanciesHandler implements IQueryHandler<GetAllVacanciesQuery> {
  async execute(query: GetAllVacanciesQuery): Promise<VacancyDto[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const where: {isActive?: boolean; type?: VacancyType} = {};
    if (query.filters.isActive !== undefined) where.isActive = query.filters.isActive;
    if (query.filters.type !== undefined) where.type = query.filters.type;
    const items = await Vacancy.find({where, skip: (page - 1) * take, take, order: {id: 'DESC'}});
    return plainToInstance(VacancyDto, items, {excludeExtraneousValues: true});
  }
}
