import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CqrsModule} from '@nestjs/cqrs';
import {EventsEntity} from '../entities/events/events.entity';
import {EventCategoriesEntity} from '../entities/event-categories/event-categories.entity';
import {EventsController} from './events.controller';
import {EventsService} from './events.service';
import {EventsRepository} from './events.repository';
import {EventsCommandHandlers, EventsQueryHandlers} from './events.cqrs';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([EventsEntity, EventCategoriesEntity])],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository, ...EventsCommandHandlers, ...EventsQueryHandlers],
  exports: [EventsService],
})
export class EventsModule {}
