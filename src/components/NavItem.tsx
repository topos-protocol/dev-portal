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
  isExpanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  setNavExpanded: Dispatch<SetStateAction<boolean>>;
}

// class NavItem extends React.Component<{ location: Location }> {
export const NavItem: React.FC<NavItemProps> = ({
  navItem,
  isExpanded,
  setExpanded,
  setNavExpanded,
}) => {
  const PAGE_IN_PROGRESS_PATH = '/content/page-in-progress.html';

  const disabled = navItem.label.toLowerCase().startsWith('disabled:');
  const navItemLabel = navItem.label.replace('disabled:', '');
  const disabledStyle = disabled
    ? {
        opacity: 0.5,
        pointerEvents: 'none',
      }
    : {};
  return <li className={navItem.content ? '-translate-x-[1rem]' : ''}>
    {navItem.path ? (
      <Link
        {...{
          className: 'hover:text-action-reg max-md:block',
          activeClassName: 'nav-item-active',
          style: disabledStyle,
          to: navItem.path,
          onClick: (event) => {
            if (disabled) {
              event.stopPropagation();
            } else {
              // setNavExpanded(false);
            }
          },
        }}
        getProps={(props) => {
          if (props.isCurrent && !isExpanded) {
            setExpanded(true);
          }

          return {
            className: props.isCurrent
              ? 'nav-item-active'
              : 'hover:text-action-reg',
          };
        }}
      >
        {navItemLabel}
      </Link>
    ) : (
      <button
        className="inline-flex cursor-pointer items-center gap-2 hover:text-action-reg max-md:w-full"
        onClick={() => setExpanded(!isExpanded)}
      >
        <span
          className={twMerge(
            'fill-icon inline-flex h-2 w-2 transition-all ease-in-out',
            isExpanded ? 'rotate-0' : '-rotate-90'
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
          'ml-4 flex flex-col gap-2 pl-3 pt-3',
          !isExpanded && 'hidden'
        )}
        aria-hidden={!isExpanded}
        onClick={(event) => event.stopPropagation()}
      >
        {navItem.content.map(
          (subNavItem: NavigationItemType, subNavItemIndex: number) => {
            return (
              <NavItem
                navItem={subNavItem}
                key={`subNavItem${subNavItemIndex}`}
                isExpanded={isExpanded}
                setExpanded={setExpanded}
                setNavExpanded={setNavExpanded}
              />
            );
          }
        )}
      </ul>
    )}
  </li>;
};
