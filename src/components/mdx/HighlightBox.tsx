import React, { ReactNode } from 'react';
import { IconBulb } from '../icons/IconBulb';
import { IconExclamation } from '../icons/IconExclamation';
import { IconInfo } from '../icons/IconInfo';
import { twMerge } from 'tailwind-merge';

interface HighlightBoxProps {
  className?: string;
  type?: 'info' | 'tip' | 'alert';
  children: ReactNode;
  noIcon?: boolean;
  title?: string;
}

export const HighlightBox: React.FC<HighlightBoxProps> = ({
  className,
  type,
  children,
  noIcon = false,
  title,
}) => {
  let Icon;

  switch (type) {
    case 'info':
      Icon = <IconInfo />;
      break;
    case 'tip':
      Icon = <IconBulb />;
      break;
    default:
      Icon = <IconExclamation />;
  }

  return (
    <section
      className={twMerge(
        `highlightbox flex items-start gap-3 rounded-md p-6`,
        type,
        className
      )}
    >
      {!noIcon && (
        <span className="icon mt-0.5 inline-flex h-5 w-5 shrink-0 grow-0">
          {Icon}
        </span>
      )}
      <div className="flex-1 [&>*+*]:mt-[0.5rem]">
        {title && <div className="text-base font-bold">{title}</div>}
        {children}
      </div>
    </section>
  );
};
