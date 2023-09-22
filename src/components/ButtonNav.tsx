import React from 'react';
import cn from '../utils/classMerge';

interface ButtonNavProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  type?: 'submit' | 'button' | 'reset';
}

export const ButtonNav: React.FC<ButtonNavProps> = ({
  className,
  children,
  disabled = false,
  type = 'submit',
  onClick,
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded bg-neutral-300 text-white transition-all hover:bg-gradient-to-tr hover:from-action-reg hover:to-button-linear-end active:bg-button-hover active:hover:from-button-hover active:hover:to-button-hover disabled:hidden disabled:opacity-20',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
