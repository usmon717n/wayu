import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import {UsefulLinksService} from './useful-links.service';
import {CreateUsefulLinksDto} from '../dto/useful-links/create-useful-links.dto';
import {UpdateUsefulLinksDto} from '../dto/useful-links/update-useful-links.dto';
import {DeleteUsefulLinksDto} from '../dto/useful-links/delete-useful-links.dto';
import {ListUsefulLinksDto} from '../dto/useful-links/list-useful-links.dto';

@ApiTags('Useful Links')
@Controller('useful-links')
export class UsefulLinksController {
  constructor(private readonly usefulLinksService: UsefulLinksService) {}

  @Post('create')
  @ApiOperation({summary: 'Create useful link'})
  create(@Body() dto: CreateUsefulLinksDto) {
    return this.usefulLinksService.create(dto);
  }

  @Put('update/:id')
  @ApiOperation({summary: 'Update useful link'})
  @ApiParam({name: 'id', type: Number})
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUsefulLinksDto,
  ) {
    return this.usefulLinksService.update({...dto, id});
  }

  @Delete('delete')
  @ApiOperation({summary: 'Delete useful link'})
  @ApiBody({type: DeleteUsefulLinksDto})
  remove(@Body() dto: DeleteUsefulLinksDto) {
    return this.usefulLinksService.delete(dto);
  }

  @Get('detail/:id')
  @ApiOperation({summary: 'Get useful link detail'})
  @ApiParam({name: 'id', type: Number})
  detail(@Param('id', ParseIntPipe) id: number) {
    return this.usefulLinksService.detail({id});
  }

  @Get('list')
  @ApiOperation({summary: 'Get useful links list'})
  list(@Query() dto: ListUsefulLinksDto) {
    return this.usefulLinksService.list(dto);
  }
}
