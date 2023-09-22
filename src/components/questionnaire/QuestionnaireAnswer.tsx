import React, { useRef } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { IconTick } from '../icons/IconTick';
import { twMerge } from 'tailwind-merge';

type QuestionnaireAnswerProps = {
  name: string;
  answer: string;
  correct: boolean;
  displayResults: boolean;
  type: 'radio' | 'checkbox';
  register: UseFormRegister<FieldValues>;
  answerIndex: number;
  questionIndex: number;
  source: string;
};

export const QuestionnaireAnswer: React.FC<QuestionnaireAnswerProps> = ({
  answer,
  correct,
  name,
  type,
  answerIndex,
  questionIndex,
  register,
  displayResults,
  source,
}) => {
  const inputRef = useRef<HTMLLabelElement | null>(null);
  return (
    <div className="mt-3 first:mt-0" key={name}>
      <label
        className={twMerge(
          'group relative flex items-start gap-4',
          !displayResults && 'cursor-pointer'
        )}
        htmlFor={name}
        ref={inputRef}
      >
        <input
          type={type}
          className="peer sr-only"
          id={name}
          {...register(`${source}q${questionIndex}`)}
          value={answerIndex}
          disabled={displayResults}
        />
        <span
          className={twMerge(
            'peer-disabled-focus:text-text-reg flex w-full flex-1 gap-4 rounded-md border border-neutral-500 px-5 py-2 transition-all before:mt-0.5 before:shrink-0 before:grow-0 before:border before:border-neutral-500 before:bg-transparent peer-checked:font-semibold peer-focus:bg-highlight-bg peer-disabled:hover:text-text-reg',
            type === 'radio'
              ? 'mb-0.5 before:h-6 before:w-6 before:rounded-full'
              : 'pr-10 before:h-8 before:w-8 before:rounded-md',
            displayResults
              ? !correct
                ? 'peer-checked:bg-error-bg'
                : 'bg-highlight-bg font-semibold'
              : 'group-hover:bg-highlight-bg peer-checked:bg-highlight-bg'
          )}
        >
          {type === 'checkbox' && (
            <span className="absolute top-3 -mt-[1px] flex h-8 w-8 items-center justify-center">
              {String.fromCharCode(answerIndex + 1 + 64)}
            </span>
          )}
          <span className={`${type === 'radio' ? 'mt-0.5' : 'mt-1.5'}`}>
            {answer}
          </span>
        </span>
        {type === 'checkbox' ? (
          <span className="absolute right-4 top-4 scale-0 opacity-0 transition-all peer-checked:scale-100 peer-checked:opacity-100">
            <span className="inline-flex h-4 w-4">
              <IconTick />
            </span>
          </span>
        ) : (
          <span className="absolute -top-[1px] left-[9px] flex h-6 w-6 translate-x-[50%] translate-y-[50%] scale-0 items-center justify-center opacity-0 transition-all peer-checked:scale-100 peer-checked:opacity-100">
            <span className="h-3 w-3 rounded-full bg-neutral-600"></span>
          </span>
        )}
      </label>
    </div>
  );
};
