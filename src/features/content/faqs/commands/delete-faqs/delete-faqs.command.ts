import {Command} from '@nestjs/cqrs';

export class DeleteFaqsCommand extends Command<void> {
  id!: number;
}
