import React, { Dispatch, SetStateAction, useState } from 'react';
import config from '../../config';
import { NavigationItemType } from '../interfaces/Config';
import { IconCaretDown } from './icons/IconCaretDown';
import { Link } from 'gatsby';
import { twMerge } from 'tailwind-merge';

interface NavItem {
  label: string;
  path?: string;
  content?: Array<NavigationItemType>;
}

interface NavItemProps {
  navItem: NavigationItemType;
  setNavExpanded: Dispatch<SetStateAction<boolean>>;
}

interface StaticNavProps {
  setNavExpanded: Dispatch<SetStateAction<boolean>>;
  pageTransition: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  navItem,
  setNavExpanded,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const PAGE_IN_PROGRESS_PATH = '/content/page-in-progress.html';
  return (
    <li className={navItem.content ? '-translate-x-[1rem]' : ''}>
      {navItem.path ? (
        <Link
          className="hover:text-action-reg max-md:block"
          activeClassName={
            navItem.path !== PAGE_IN_PROGRESS_PATH
              ? 'text-action-reg font-semibold'
              : ''
          }
          to={navItem.path}
          onClick={() => setNavExpanded(false)}
        >
          {navItem.label}
        </Link>
      ) : (
        <button
          className="inline-flex cursor-pointer items-center gap-2 hover:text-action-reg max-md:w-full"
          onClick={() => setExpanded(!expanded)}
        >
          <span
            className={twMerge(
              'fill-icon inline-flex h-2 w-2 transition-all ease-in-out',
              expanded ? 'rotate-0' : '-rotate-90'
            )}
          >
            <IconCaretDown />
          </span>
          {navItem.label}
        </button>
      )}
      {navItem.content && (
        <ul
          className={twMerge(
            'ml-4 flex flex-col gap-3 pl-3 pt-3',
            !expanded && 'hidden'
          )}
          aria-hidden={!expanded}
        >
          {navItem.content.map(
            (subNavItem: NavigationItemType, subNavItemIndex: number) => {
              return (
                <li key={subNavItemIndex}>
                  <Link
                    className="hover:text-action-reg max-md:block"
                    to={subNavItem.path || ''}
                    activeClassName={
                      subNavItem.path !== PAGE_IN_PROGRESS_PATH
                        ? 'text-action-reg font-semibold'
                        : ''
                    }
                    onClick={() => setNavExpanded(false)}
                  >
                    {subNavItem.label}
                  </Link>
                </li>
              );
            }
          )}
        </ul>
      )}
    </li>
  );
};

export const StaticNav: React.FC<StaticNavProps> = ({
  setNavExpanded,
  pageTransition,
}) => {
  return (
    <nav
      className={twMerge('px-8', pageTransition && 'pointer-events-none')}
      arial-label="Main"
    >
      <ul className="flex flex-col gap-12">
        {config.navigation.map((navGroup, navGroupIndex: number) => (
          <li className="flex flex-col gap-3" key={`navGroup${navGroupIndex}`}>
            {navGroup.path ? (
              <Link
                className="hover:text-action-reg"
                to={navGroup.path}
                activeClassName="text-action-reg text-semibold"
                onClick={() => setNavExpanded(false)}
              >
                {navGroup.label}
              </Link>
            ) : (
              <strong>{navGroup.label}</strong>
            )}
            {navGroup.content && (
              <ul className={`flex flex-col gap-3`}>
                {navGroup.content.map(
                  (navItem: NavigationItemType, navItemIndex: number) => (
                    <NavItem
                      navItem={navItem}
                      key={`navItem${navItemIndex}`}
                      setNavExpanded={setNavExpanded}
                    />
                  )
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
