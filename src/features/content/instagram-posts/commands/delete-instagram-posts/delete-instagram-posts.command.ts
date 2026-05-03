import {Command} from '@nestjs/cqrs';

export class DeleteInstagramPostsCommand extends Command<void> {
  id!: number;
}
