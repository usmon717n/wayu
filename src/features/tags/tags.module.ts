import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TagsEntity} from '../entities/tags/tags.entity';
import {TagsController} from './tags.controller';
import {TagsRepository} from './tags.repository';
import {TagsService} from './tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagsEntity])],
  controllers: [TagsController],
  providers: [TagsRepository, TagsService],
  exports: [TagsService],
})
export class TagsModule {}
