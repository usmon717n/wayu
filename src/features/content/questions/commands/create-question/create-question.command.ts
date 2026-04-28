import {QuestionStatus} from "../../../../../core/enum/enum";

export class CreateQuestionCommand {
    fullName!: string;
    phoneNumber!: string;
    question!: string;
    status!: QuestionStatus;
}
