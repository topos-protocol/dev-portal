import React, { useEffect, useRef, useState } from 'react';
import convertToAnchorLink from '../utils/convertToAnchorLink';
import { IconAnchor } from './icons/IconAnchor';
import { twMerge } from 'tailwind-merge';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  type: 'h2' | 'h3';
}

interface HeadingButtonProps {
  anchor: string;
}

type HTMLAnchorEvent<T extends HTMLElement> =
  React.MouseEvent<HTMLAnchorElement> & { target: T };

const HeadingButton: React.FC<HeadingButtonProps> = ({ anchor }) => {
  const handleButtonClick = (event: HTMLAnchorEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetHref =
      event.target.tagName === 'A'
        ? event.target.href
        : event.target.closest('a')?.href || '';
    navigator?.clipboard?.writeText(targetHref);
  };

  return (
    <a
      className="discreet-link text-action-reg transition-all focus-visible:translate-x-0 focus-visible:opacity-100 lg:translate-x-5 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100"
      href={`#${anchor}`}
      onClick={handleButtonClick}
      title="Copy to clipboard"
    >
      <span className="flex h-5 w-5">
        <IconAnchor />
      </span>
    </a>
  );
};

export const Heading: React.FC<HeadingProps> = ({ children, type }, props) => {
  const className = 'relative flex items-center gap-1 group font-bold';
  const anchor = convertToAnchorLink(String(children));
  const [directChild, setDirectChild] = useState<boolean>(false);
  const ref = useRef<HTMLHeadingElement>();

  useEffect(() => {
    if (!ref.current || ref.current.parentElement?.tagName !== 'MAIN') return;
    setDirectChild(true);
  }, []);

  return (
    <>
      {type === 'h2' ? (
        <h2
          className={twMerge(className, directChild && 'md:-ml-6')}
          id={anchor}
          ref={ref}
          {...props}
        >
          {directChild && <HeadingButton anchor={anchor} />}
          <span className="flex-1">{children}</span>
        </h2>
      ) : (
        <h3
          className={twMerge(className, directChild && 'md:-ml-6')}
          id={anchor}
          ref={ref}
          {...props}
        >
          {directChild && <HeadingButton anchor={anchor} />}
          <span className="flex-1">{children}</span>
        </h3>
      )}
    </>
  );
};
