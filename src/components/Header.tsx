import React, { Dispatch, SetStateAction } from 'react';
import { IconClose } from './icons/IconClose';
import { IconNav } from './icons/IconNav';
import { IconList } from './icons/IconList';
import { Link } from 'gatsby';
import { Logo } from './Logo';
import config from '../../config';
import { twMerge } from 'tailwind-merge';
import { Search } from './Search';
import { ModeToggle } from './ModeToggle';

interface HeaderProps {
  navExpanded: boolean;
  setNavExpanded: Dispatch<SetStateAction<boolean>>;
  setTocExpanded: Dispatch<SetStateAction<boolean>>;
  tocExpanded: boolean;
  tocEnabled: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  navExpanded,
  setNavExpanded,
  setTocExpanded,
  tocExpanded,
  tocEnabled,
}) => {
  return (
    <header className="header">
      <div className="mx-auto flex h-[80px] max-w-[1920px] items-center justify-between gap-4 px-4 py-6 font-semibold leading-none text-neutral-500 md:px-8">
        <div className="flex flex-1 items-center justify-between">
          <Link
            className="inline-flex text-[0] leading-none"
            to="/"
            onClick={() => setNavExpanded(false)}
          >
            <h1 className="sr-only">{config.siteTitle}</h1>
            <Logo />
          </Link>
          {tocEnabled && (
            <button
              onClick={() => setTocExpanded(!tocExpanded)}
              className={twMerge(
                'toc mr-1 inline-flex items-center justify-center gap-1 text-sm font-normal transition-all lg:hidden',
                tocExpanded && 'pointer-events-none text-action-reg'
              )}
            >
              <span className="inline-flex h-6 w-6">
                <IconList />
              </span>
              <span>Content</span>
            </button>
          )}
        </div>
        <Search />
        <ModeToggle />
        <button
          className="md:hidden"
          type="button"
          onClick={() => setNavExpanded(!navExpanded)}
          title={`${navExpanded ? 'Close' : 'Open'} the navigation`}
        >
          <span className="relative h-6 w-6">
            <span
              className={twMerge(
                'absolute inline-flex h-6 w-6 transition-all ease-in-out',
                navExpanded ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
              )}
            >
              <IconClose />
            </span>
            <span
              className={twMerge(
                'inline-flex h-6 w-6 transition-all ease-in-out',
                !navExpanded ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
              )}
            >
              <IconNav />
            </span>
          </span>
        </button>
      </div>
    </header>
  );
};
