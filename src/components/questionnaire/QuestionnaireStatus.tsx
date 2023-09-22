import React from 'react';

type QuestionnaireStatusProps = {
  currentStep: number;
  stepsTotal: number;
};

export const QuestionnaireStatus: React.FC<QuestionnaireStatusProps> = ({
  currentStep,
  stepsTotal,
}) => {
  return (
    <div className="ml-9 justify-self-start">
      <span className="text-sm text-neutral-500">
        {currentStep + 1} of {stepsTotal}
      </span>
    </div>
  );
};
