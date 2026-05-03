import {NotFoundException} from '@nestjs/common';
import {ApiProperty} from '@nestjs/swagger';
import {Command, CommandHandler, ICommandHandler, IQueryHandler, Query, QueryHandler} from '@nestjs/cqrs';
import {plainToInstance, Type} from 'class-transformer';
import {IsEnum, IsInt, IsOptional, IsString, MaxLength, Min} from 'class-validator';
import {QuestionStatus} from '@/features/content/content.enums';
import {Question} from '@/features/content/questions/question.entity';
import {QuestionDto} from '@/features/content/questions/question.dto';

export class CreateQuestionCommand extends Command<QuestionDto> {
  @IsString() @MaxLength(64) @ApiProperty() fullName!: string;
  @IsString() @MaxLength(16) @ApiProperty() phoneNumber!: string;
  @IsString() @MaxLength(2000) @ApiProperty() question!: string;
  @IsEnum(QuestionStatus) @ApiProperty({enum: QuestionStatus}) status!: QuestionStatus;
}

export class UpdateQuestionCommand extends Command<QuestionDto> {
  id!: number;
  @IsOptional() @IsString() @MaxLength(64) @ApiProperty({required: false}) fullName?: string;
  @IsOptional() @IsString() @MaxLength(16) @ApiProperty({required: false}) phoneNumber?: string;
  @IsOptional() @IsString() @MaxLength(2000) @ApiProperty({required: false}) question?: string;
  @IsOptional() @IsEnum(QuestionStatus) @ApiProperty({required: false, enum: QuestionStatus}) status?: QuestionStatus;
}

export class DeleteQuestionCommand extends Command<void> { constructor(public readonly id: number) { super(); } }
export class GetQuestionByIdQuery extends Query<QuestionDto> { constructor(public readonly id: number) { super(); } }

export class GetAllQuestionsFilters {
  @IsOptional() @IsEnum(QuestionStatus) @ApiProperty({required: false, enum: QuestionStatus}) status?: QuestionStatus;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) page?: number;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) @ApiProperty({required: false}) size?: number;
}
export class GetAllQuestionsQuery extends Query<QuestionDto[]> { constructor(public readonly filters: GetAllQuestionsFilters) { super(); } }

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionHandler implements ICommandHandler<CreateQuestionCommand> {
  async execute(command: CreateQuestionCommand): Promise<QuestionDto> {
    const item = Question.create({
      fullName: command.fullName,
      phoneNumber: command.phoneNumber,
      question: command.question,
      status: command.status,
    } as Question);
    await Question.save(item);
    return plainToInstance(QuestionDto, item, {excludeExtraneousValues: true});
  }
}

@CommandHandler(UpdateQuestionCommand)
export class UpdateQuestionHandler implements ICommandHandler<UpdateQuestionCommand> {
  async execute(command: UpdateQuestionCommand): Promise<QuestionDto> {
    const item = await Question.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Question with given id not found');
    Object.assign(item, command);
    await Question.save(item);
    return plainToInstance(QuestionDto, item, {excludeExtraneousValues: true});
  }
}

@CommandHandler(DeleteQuestionCommand)
export class DeleteQuestionHandler implements ICommandHandler<DeleteQuestionCommand> {
  async execute(command: DeleteQuestionCommand): Promise<void> {
    const item = await Question.findOneBy({id: command.id});
    if (!item) throw new NotFoundException('Question with given id not found');
    await Question.remove(item);
  }
}

@QueryHandler(GetQuestionByIdQuery)
export class GetQuestionByIdHandler implements IQueryHandler<GetQuestionByIdQuery> {
  async execute(query: GetQuestionByIdQuery): Promise<QuestionDto> {
    const item = await Question.findOneBy({id: query.id});
    if (!item) throw new NotFoundException('Question with given id not found');
    return plainToInstance(QuestionDto, item, {excludeExtraneousValues: true});
  }
}

@QueryHandler(GetAllQuestionsQuery)
export class GetAllQuestionsHandler implements IQueryHandler<GetAllQuestionsQuery> {
  async execute(query: GetAllQuestionsQuery): Promise<QuestionDto[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const where: {status?: QuestionStatus} = {};
    if (query.filters.status !== undefined) where.status = query.filters.status;
    const items = await Question.find({where, skip: (page - 1) * take, take, order: {id: 'DESC'}});
    return plainToInstance(QuestionDto, items, {excludeExtraneousValues: true});
  }
}
