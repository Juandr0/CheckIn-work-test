export interface IExercise {
    id: number;
    title: string;
    sessionInfo: string;
    description: string;
    questions?: IQuestions;
    type: string;
}

export interface IQuestions {
    secondsPerQuestion: number;
    questions: string[];
}