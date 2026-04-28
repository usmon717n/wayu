import {QuestionStatus} from "../../../../../core/enum/enum";

export class UpdateQuestionCommand {
    id!: number;
    fullName!: string;
    phoneNumber!: string;
    question!: string;
    status!: QuestionStatus;
}
