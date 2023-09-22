import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useForm, FieldValues } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { QuestionnaireScore } from '../questionnaire/QuestionnaireScore';
import {
  QuestionnaireAnswerType,
  QuestionnaireStepType,
} from '../../interfaces/Questionnaire';
import { QuestionnaireActions } from '../questionnaire/QuestionnaireActions';
import { QuestionnaireStep } from '../questionnaire/QuestionnaireStep';
import { QuestionnaireStatus } from '../questionnaire/QuestionnaireStatus';
import config from '../../../config';

interface QuestionnaireProps {
  source: string;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({ source }) => {
  const data = useStaticQuery(graphql`
    {
      allText {
        nodes {
          name
          content {
            question
            answers {
              answer
              correct
              type
            }
            explanation
          }
        }
      }
    }
  `);

  if (!data.allText.nodes.length) return null;

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [errorsLength, setErrorsLength] = useState<number>(0);
  const [validationError, setValidationError] = useState<boolean>(false);
  const [currentStepType, setCurrentStepType] = useState<string | null>();
  const [displayResults, setDisplayResults] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm();
  const form = useRef<HTMLFormElement | null>(null);
  const questionnaire: QuestionnaireStepType[] | undefined = useMemo(() => {
    for (let i = 0; i < data.allText.nodes.length; i++) {
      const node = data.allText.nodes[i];
      if (node.name !== source) continue;
      return node.content as QuestionnaireStepType[];
    }
  }, [data]);

  if (!questionnaire?.length) return;

  const displayScore = currentStep === questionnaire.length;

  const checkStepValidity = (): boolean => {
    const stepNode = form.current?.querySelectorAll('fieldset')[currentStep];
    if (!stepNode) return true;
    if (stepNode.querySelectorAll('input:checked').length === 0) {
      setValidationError(true);
      return false;
    }
    setValidationError(false);
    return true;
  };

  const handleNext = (): void => {
    if (!checkStepValidity()) return;
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = (): void => {
    setValidationError(false);
    setCurrentStep(currentStep - 1);
  };

  const handleRetry = (): void => {
    reset();
    setDisplayResults(false);
    setCurrentStep(0);
    setScore(0);
  };

  const handleViewResults = (): void => {
    setDisplayResults(true);
    setCurrentStep(0);
  };

  const handleFormSubmit = (formValues: FieldValues): void => {
    if (!checkStepValidity()) return;

    let errors: number[] = [];

    questionnaire.forEach(
      ({ answers }: QuestionnaireStepType, questionIndex: number) => {
        const formValue = [...formValues[`${source}q${questionIndex}`]];
        let questionError = false;
        answers.forEach(
          (answer: QuestionnaireAnswerType, answerIndex: number) => {
            const { correct } = answer;
            const answerIncluded = formValue.includes(String(answerIndex));
            if (
              (correct && answerIncluded) ||
              (!correct && !answerIncluded) ||
              questionError
            )
              return;
            errors.push(questionIndex);
            questionError = true;
          }
        );
      }
    );

    setScore(
      ((questionnaire.length - errors.length) / questionnaire.length) * 100
    );
    setCurrentStep(questionnaire.length);
    setErrorsLength(errors.length);
    setDisplayResults(false);
  };

  useEffect(() => {
    if (!form.current) return;
    const formOffsetTop =
      form.current.getBoundingClientRect().top +
      window.scrollY -
      config.headerOffset;
    if (window.scrollY > formOffsetTop && currentStep > 0) {
      window.scrollTo({ top: formOffsetTop });
    }
    setTimeout(() => {
      const fieldset = form.current?.querySelectorAll('fieldset')[currentStep];
      const firstInput = fieldset?.querySelector('input');
      const type = firstInput?.type || null;
      setCurrentStepType(type);
      if (currentStep === 0 || !firstInput) return;
      firstInput.focus();
    }, 200);
  }, [currentStep]);

  return (
    <div className="relative">
      <form
        className="relative flex flex-col gap-12 accent-action-reg transition-all"
        ref={form}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <AnimatePresence>
          {questionnaire.map(
            (
              { question, answers, explanation }: QuestionnaireStepType,
              questionIndex: number
            ) => (
              <QuestionnaireStep
                answers={answers}
                currentStep={currentStep}
                currentStepType={currentStepType}
                displayResults={displayResults}
                explanation={explanation}
                key={`${source}q${questionIndex}`}
                question={question}
                questionIndex={questionIndex}
                register={register}
                validationError={validationError}
                source={source}
              />
            )
          )}
          <QuestionnaireScore
            handleViewResults={handleViewResults}
            handleRetry={handleRetry}
            num={score}
            displayScore={displayScore}
            key="score"
            questionnaireTextScore={`${questionnaire.length - errorsLength}/${
              questionnaire.length
            }`}
          />
          {!displayScore && (
            <div className="flex items-center justify-between">
              <QuestionnaireStatus
                currentStep={currentStep}
                stepsTotal={questionnaire.length}
              />
              <QuestionnaireActions
                displayNext={currentStep < questionnaire.length - 1}
                displayPrevious={currentStep > 0}
                displaySubmit={currentStep === questionnaire.length - 1}
                displayResults={displayResults}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
              />
            </div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};
