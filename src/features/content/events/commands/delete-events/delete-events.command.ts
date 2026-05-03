import {Command} from '@nestjs/cqrs';
export class DeleteEventsCommand extends Command<void> { id!: number; }
