import {
  QuestionnaireAnswerType,
  QuestionnaireStepType,
} from '../interfaces/Questionnaire';

type AnswersAndExplanationType = {
  answers: QuestionnaireAnswerType[];
  explanation: string | null;
};

const extractAnswersAndExplanation = (
  rawAnswers: string
): AnswersAndExplanationType => {
  const answers: QuestionnaireAnswerType[] = [];
  let explanation: string | null = null;
  const rawAnswersList = rawAnswers.split('\n').filter((c) => c !== '');

  rawAnswersList.forEach((answer: string, index: number) => {
    if (answer.startsWith('[explanation]')) {
      explanation = rawAnswersList[index + 1];
      return [...Array(3).keys()].forEach((_, i: number) =>
        rawAnswersList.splice(index + i, 1)
      );
    }
    answers.push({
      correct: answer.includes('[x]') || answer.includes('(x)'),
      type: answer.startsWith('[') ? 'checkbox' : 'radio',
      answer: answer.slice(4),
    });
  });

  return {
    answers,
    explanation,
  };
};

const extractQuestionnaire = (content: string): QuestionnaireStepType[] => {
  return content
    .split('>> ')
    .filter((c) => c !== '' && c !== '\n')
    .map((c: string): QuestionnaireStepType => {
      const [question, rawAnswers] = c.split('<<');
      return {
        question,
        ...extractAnswersAndExplanation(rawAnswers),
      } as QuestionnaireStepType;
    });
};

export default extractQuestionnaire;
