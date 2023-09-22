import React, { PropsWithChildren } from 'react';
import { HighlightBox } from './HighlightBox';
import { Link } from 'gatsby';
import { IconArrowRight } from '../icons/IconArrowRight';

interface CardProps {
  title?: string;
  to: string;
}

export const Card: React.FC<PropsWithChildren<CardProps>> = ({
  children,
  title,
  to,
}) => {
  return (
    <Link to={to} className="discreet-link group relative block rounded-md">
      <HighlightBox
        className="relative h-full bg-highlight-light px-6 pr-10 text-neutral-700"
        title={title}
        noIcon
      >
        {children}
      </HighlightBox>
      <span className="absolute right-4 top-3 flex h-6 w-6 text-action-reg transition-all group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 lg:-translate-x-5 lg:opacity-0">
        <IconArrowRight />
      </span>
    </Link>
  );
};
