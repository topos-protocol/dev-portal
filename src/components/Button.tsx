import React from 'react';
import cn from '../utils/classMerge';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  disabled = false,
  type = 'submit',
  onClick = () => null,
  ...props
}) => {
  return (
    <button
      className={cn(
        'rounded bg-gradient-to-tr from-button-hover to-button-linear-end px-6 py-2 font-bold text-white transition-all hover:from-button-linear-end hover:to-button-hover active:from-button-active active:to-button-active',
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
