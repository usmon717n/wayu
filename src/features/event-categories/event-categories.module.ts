import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CqrsModule} from '@nestjs/cqrs';
import {EventCategoriesEntity} from '../entities/event-categories/event-categories.entity';
import {EventCategoriesController} from './event-categories.controller';
import {EventCategoriesService} from './event-categories.service';
import {EventCategoriesRepository} from './event-categories.repository';
import {EventCategoriesCommandHandlers, EventCategoriesQueryHandlers} from './event-categories.cqrs';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([EventCategoriesEntity])],
  controllers: [EventCategoriesController],
  providers: [EventCategoriesService, EventCategoriesRepository, ...EventCategoriesCommandHandlers, ...EventCategoriesQueryHandlers],
  exports: [EventCategoriesService],
})
export class EventCategoriesModule {}
