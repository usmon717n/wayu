import {BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiConsumes, ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {BookDto} from '@/features/content/books/book.dto';
import {CreateBookCommand, DeleteBookCommand, GetAllBooksFilters, GetAllBooksQuery, GetBookByIdQuery, UpdateBookCommand} from '@/features/content/books/book.cqrs';
import {FileInterceptor} from '@nestjs/platform-express';
import {storageOptions} from '@/configs/multer.config';
import fs from 'fs';

@Controller('admin/books')
export class BooksController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  @Get() @ApiOkResponse({type: [BookDto]}) getAll(@Query() filters: GetAllBooksFilters) { return this.queryBus.execute(new GetAllBooksQuery(filters)); }
  @Get(':id') @ApiOkResponse({type: BookDto}) getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetBookByIdQuery(id)); }
  @Post() @ApiCreatedResponse({type: BookDto}) @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', {storage: storageOptions, limits: {fileSize: 1024 * 1024 * 5}}))
  async create(@Body() command: CreateBookCommand, @UploadedFile() image: Express.Multer.File) {
    if (!image) throw new BadRequestException('Image file is required');
    command.image = image.filename;

    try {
      return await this.commandBus.execute(command);
    } catch (error) {
      if (fs.existsSync(image.path)) fs.rmSync(image.path);
      throw error;
    }
  }
  @Patch(':id') @ApiOkResponse({type: BookDto}) update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateBookCommand) { command.id = id; return this.commandBus.execute(command); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.commandBus.execute(new DeleteBookCommand(id)); }
}
