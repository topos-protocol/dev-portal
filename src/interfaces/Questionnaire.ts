export interface QuestionnaireAnswerType {
  answer: string;
  correct: boolean;
  type: 'checkbox' | 'radio';
}

export interface QuestionnaireStepType {
  question: string;
  answers: QuestionnaireAnswerType[];
  explanation?: string;
}
