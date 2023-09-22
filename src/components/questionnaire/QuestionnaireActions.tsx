import React from 'react';
import { ButtonNav } from '../ButtonNav';
import { IconChevronRight } from '../icons/IconChevronRight';
import { IconChevronLeft } from '../icons/IconChevronLeft';
import { Button } from '../Button';

type QuestionnaireActionsType = {
  displayNext: boolean;
  displayPrevious: boolean;
  displaySubmit: boolean;
  displayResults: boolean;
  handleNext: () => void;
  handlePrevious: () => void;
};

export const QuestionnaireActions: React.FC<QuestionnaireActionsType> = ({
  displayNext,
  displayPrevious,
  displaySubmit,
  displayResults,
  handleNext,
  handlePrevious,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {displayPrevious && (
        <ButtonNav onClick={handlePrevious} type="button" title="previous">
          <span className="inline-flex h-5 w-5">
            <IconChevronLeft />
          </span>
        </ButtonNav>
      )}
      {displayNext && (
        <ButtonNav
          className="justify-self-end"
          onClick={handleNext}
          type="button"
          title="next"
        >
          <span className="inline-flex h-5 w-5">
            <IconChevronRight />
          </span>
        </ButtonNav>
      )}
      {displaySubmit && (
        <Button className="text-sm">
          {displayResults ? 'View Score' : 'Submit'}
        </Button>
      )}
    </div>
  );
};
