import {NotFoundException} from '@nestjs/common';
import {ApiProperty} from '@nestjs/swagger';
import {Command, CommandHandler, ICommandHandler, IQueryHandler, Query, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance, Type} from 'class-transformer';
import {IsInt, IsOptional, IsString, MaxLength, Min} from 'class-validator';
import {Language} from '@/features/content/languages/language.entity';
import {LanguageDto} from '@/features/content/languages/language.dto';

export class CreateLanguageCommand extends Command<LanguageDto> { @IsString() @MaxLength(64) @ApiProperty() title!: string; }
export class UpdateLanguageCommand extends Command<LanguageDto> { id!: number; @IsOptional() @IsString() @MaxLength(64) @ApiProperty({required: false}) title?: string; }
export class DeleteLanguageCommand extends Command<void> { constructor(public readonly id: number) { super(); } }
export class GetLanguageByIdQuery extends Query<LanguageDto> { constructor(public readonly id: number) { super(); } }
export class GetAllLanguagesFilters {
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) page?: number;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) size?: number;
}
export class GetAllLanguagesQuery extends Query<LanguageDto[]> { constructor(public readonly filters: GetAllLanguagesFilters) { super(); } }

@CommandHandler(CreateLanguageCommand)
export class CreateLanguageHandler implements ICommandHandler<CreateLanguageCommand> {
  async execute(command: CreateLanguageCommand): Promise<LanguageDto> {
    const item = Language.create({title: command.title} as Language);
    await Language.save(item);
    return plainToInstance(LanguageDto, item, {excludeExtraneousValues: true});
  }
}
@CommandHandler(UpdateLanguageCommand)
export class UpdateLanguageHandler implements ICommandHandler<UpdateLanguageCommand> {
  async execute(command: UpdateLanguageCommand): Promise<LanguageDto> {
    const item = await Language.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Language with given id not found');
    if (command.title !== undefined) item.title = command.title;
    await Language.save(item);
    return plainToInstance(LanguageDto, item, {excludeExtraneousValues: true});
  }
}
@CommandHandler(DeleteLanguageCommand)
export class DeleteLanguageHandler implements ICommandHandler<DeleteLanguageCommand> {
  async execute(command: DeleteLanguageCommand): Promise<void> {
    const item = await Language.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Language with given id not found');
    await Language.remove(item);
  }
}
@QueryHandler(GetLanguageByIdQuery)
export class GetLanguageByIdHandler implements IQueryHandler<GetLanguageByIdQuery> {
  async execute(query: GetLanguageByIdQuery): Promise<LanguageDto> {
    const item = await Language.findOneBy({id: query.id});
    if (!item) throw new NotFoundException('Language with given id not found');
    return plainToInstance(LanguageDto, item, {excludeExtraneousValues: true});
  }
}
@QueryHandler(GetAllLanguagesQuery)
export class GetAllLanguagesHandler implements IQueryHandler<GetAllLanguagesQuery> {
  async execute(query: GetAllLanguagesQuery): Promise<LanguageDto[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const items = await Language.find({skip: (page - 1) * take, take, order: {id: 'DESC'}});
    return plainToInstance(LanguageDto, items, {excludeExtraneousValues: true});
  }
}
