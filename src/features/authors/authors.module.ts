import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CqrsModule} from '@nestjs/cqrs';
import {AuthorsEntity} from '../entities/authors/authors.entity';
import {AuthorsController} from './authors.controller';
import {AuthorsService} from './authors.service';
import {AuthorsRepository} from './authors.repository';
import {AuthorsCommandHandlers, AuthorsQueryHandlers} from './authors.cqrs';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([AuthorsEntity])],
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorsRepository, ...AuthorsCommandHandlers, ...AuthorsQueryHandlers],
  exports: [AuthorsService],
})
export class AuthorsModule {}
