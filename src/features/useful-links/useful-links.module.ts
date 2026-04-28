import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsefulLinkEntity} from '../entities/useful-links/useful-links.entity';
import {UsefulLinksController} from './useful-links.controller';
import {UsefulLinksRepository} from './useful-links.repository';
import {UsefulLinksService} from './useful-links.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsefulLinkEntity])],
  controllers: [UsefulLinksController],
  providers: [UsefulLinksRepository, UsefulLinksService],
  exports: [UsefulLinksService],
})
export class UsefulLinksModule {}
