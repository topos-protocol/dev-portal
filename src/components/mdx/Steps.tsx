import React from 'react';

interface StepItemProps {
  index: number;
  children: React.ReactNode;
}

export const Steps: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex flex-col gap-6 pb-8">
      {React.Children.map(children, (child: any, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { ...{ index } })
          : child
      )}
      <span className="absolute bottom-2 left-4 h-0 w-8 border-t border-action-reg/50" />
    </div>
  );
};

export const StepItem: React.FC<StepItemProps> = ({ index, children }) => {
  return (
    <div className="relative flex items-start gap-4">
      <span className="-z-1 absolute -bottom-6 left-4 top-0 w-0 border-r border-action-reg/50" />
      <span className="z-1 relative inline-flex h-8 w-8 shrink-0 grow-0 items-center justify-center rounded-full bg-gradient-to-b from-button-linear-end to-action-reg font-semibold text-white">
        {index + 1}
      </span>
      <div className="md-container mt-1 flex-1 overflow-hidden">{children}</div>
    </div>
  );
};
