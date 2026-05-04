import {BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiConsumes, ApiCreatedResponse, ApiOkResponse} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {InstagramPostDto} from '@/features/content/instagram-posts/instagram-post.dto';
import {CreateInstagramPostsCommand} from './commands/create-instagram-posts/create-instagram-posts.command';
import {UpdateInstagramPostsCommand} from './commands/update-instagram-posts/update-instagram-posts.command';
import {DeleteInstagramPostsCommand} from './commands/delete-instagram-posts/delete-instagram-posts.command';
import {GetInstagramPostsByIdQuery} from './queries/get-instagram-posts-by-id/get-instagram-posts-by-id.query';
import {GetAllInstagramPostsQuery} from './queries/get-all-instagram-posts/get-all-instagram-posts.query';
import {GetAllInstagramPostsFilters} from './queries/get-all-instagram-posts/get-all-instagram-posts.filters';
import {FileInterceptor} from '@nestjs/platform-express';
import {storageOptions} from '@/configs/multer.config';
import fs from 'fs';

@Controller('admin/instagram-posts')
export class InstagramPostsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get() @ApiOkResponse({type: [InstagramPostDto]})
  async getAll(@Query() filters: GetAllInstagramPostsFilters) { return this.queryBus.execute(new GetAllInstagramPostsQuery(filters)); }

  @Get(':id') @ApiOkResponse({type: InstagramPostDto})
  async getById(@Param('id', ParseIntPipe) id: number) { return this.queryBus.execute(new GetInstagramPostsByIdQuery(id)); }

  @Post() @ApiCreatedResponse({type: InstagramPostDto}) @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', {storage: storageOptions, limits: {fileSize: 1024 * 1024 * 5}}))
  async create(@Body() command: CreateInstagramPostsCommand, @UploadedFile() image: Express.Multer.File) {
    if (!image) throw new BadRequestException('Image file is required');
    command.image = image.filename;

    try {
      return await this.commandBus.execute(command);
    } catch (error) {
      if (fs.existsSync(image.path)) fs.rmSync(image.path);
      throw error;
    }
  }

  @Patch(':id') @ApiOkResponse({type: InstagramPostDto})
  async update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateInstagramPostsCommand) {
    command.id = id;
    return this.commandBus.execute(command);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const command = new DeleteInstagramPostsCommand();
    command.id = id;
    return this.commandBus.execute(command);
  }
}
