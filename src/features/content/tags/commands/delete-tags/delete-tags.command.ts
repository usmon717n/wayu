import {Command} from '@nestjs/cqrs';
export class DeleteTagsCommand extends Command<void> { id!: number; }
