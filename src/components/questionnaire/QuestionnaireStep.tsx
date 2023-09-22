import React from 'react';
import { QuestionnaireAnswerType } from '../../interfaces/Questionnaire';
import { QuestionnaireAnswer } from './QuestionnaireAnswer';
import { HighlightBox } from '../mdx/HighlightBox';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { motion } from 'framer-motion';

type QuestionnaireStepProps = {
  answers: QuestionnaireAnswerType[];
  currentStep: number;
  explanation?: string;
  displayResults: boolean;
  currentStepType: string | null | undefined;
  question: string;
  questionIndex: number;
  register: UseFormRegister<FieldValues>;
  validationError: boolean;
  source: string;
};

export const QuestionnaireStep: React.FC<QuestionnaireStepProps> = ({
  answers,
  currentStep,
  currentStepType,
  displayResults,
  explanation,
  question,
  questionIndex,
  register,
  validationError,
  source,
}) => {
  return (
    <motion.fieldset
      className="flex flex-row gap-3 outline-0"
      key={`q${questionIndex}`}
      variants={{
        hide: { opacity: 0, x: 200, display: 'none' },
        show: { opacity: 1, x: 0, display: 'flex' },
      }}
      animate={currentStep === questionIndex ? 'show' : 'hide'}
      transition={{
        type: 'spring',
        mass: 0.5,
        stiffness: 100,
        duration: 0.2,
      }}
    >
      <div className="w-6 shrink-0 text-xl font-bold">{questionIndex + 1}.</div>
      <div className="flex-1">
        <div className="text-wrap-balance mb-8 text-xl font-bold">
          {question.split(' ').splice(1).join(' ')}
        </div>
        {answers.map((answer: QuestionnaireAnswerType, answerIndex: number) => {
          const name = `${source}q${questionIndex}_a${answerIndex}`;
          return (
            <QuestionnaireAnswer
              name={name}
              key={name}
              {...answer}
              answerIndex={answerIndex}
              questionIndex={questionIndex}
              register={register}
              displayResults={displayResults}
              source={source}
            />
          );
        })}

        {explanation && displayResults && (
          <div className="mt-8">
            <HighlightBox type="tip">
              <div dangerouslySetInnerHTML={{ __html: explanation }} />
            </HighlightBox>
          </div>
        )}

        {validationError && (
          <div className="mt-8 flex">
            <HighlightBox
              className="inline-flex font-bold uppercase text-alert-fg"
              type="alert"
            >
              Please select
              {`${currentStepType === 'checkbox' ? ' at least' : ''}`} one
              answer.
            </HighlightBox>
          </div>
        )}
      </div>
    </motion.fieldset>
  );
};
