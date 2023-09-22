import React from 'react';
import cn from '../utils/classMerge';

interface ButtonSecondaryProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
}

export const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
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
        'rounded bg-highlight-bg px-6 py-2 font-bold text-highlight-title transition-all hover:bg-button-active hover:text-white',
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
