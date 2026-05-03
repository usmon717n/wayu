import {Command} from '@nestjs/cqrs';
export class DeleteBranchesCommand extends Command<void> { id!: number; }
