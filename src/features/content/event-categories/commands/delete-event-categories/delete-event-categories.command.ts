import {Command} from '@nestjs/cqrs';
export class DeleteEventCategoriesCommand extends Command<void> { id!: number; }
