import {Command} from '@nestjs/cqrs';

export class DeleteStaticInfoCommand extends Command<void> {
  id!: number;
}
