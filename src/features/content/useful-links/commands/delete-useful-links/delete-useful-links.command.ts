import {Command} from '@nestjs/cqrs';
export class DeleteUsefulLinksCommand extends Command<void> { id!: number; }
