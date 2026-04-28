import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import {TagsService} from './tags.service';
import {CreateTagsDto} from '../dto/tags/create-tags.dto';
import {UpdateTagsDto} from '../dto/tags/update-tags.dto';
import {DeleteTagsDto} from '../dto/tags/delete-tags.dto';
import {ListTagsDto} from '../dto/tags/list-tags.dto';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post('create')
  @ApiOperation({summary: 'Create tag'})
  create(@Body() dto: CreateTagsDto) {
    return this.tagsService.create(dto);
  }

  @Put('update/:id')
  @ApiOperation({summary: 'Update tag'})
  @ApiParam({name: 'id', type: Number})
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTagsDto,
  ) {
    return this.tagsService.update({...dto, id});
  }

  @Delete('delete')
  @ApiOperation({summary: 'Delete tag'})
  @ApiBody({type: DeleteTagsDto})
  remove(@Body() dto: DeleteTagsDto) {
    return this.tagsService.delete(dto);
  }

  @Get('detail/:id')
  @ApiOperation({summary: 'Get tag detail'})
  @ApiParam({name: 'id', type: Number})
  detail(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.detail({id});
  }

  @Get('list')
  @ApiOperation({summary: 'Get tags list'})
  list(@Query() dto: ListTagsDto) {
    return this.tagsService.list(dto);
  }
}
