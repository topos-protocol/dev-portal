import { NavGroup } from './NavGroup';
import React, { Dispatch, SetStateAction, useState } from 'react';
import config from '../../config';
import { NavigationItemType } from '../interfaces/Config';
import { IconCaretDown } from './icons/IconCaretDown';
import { Link } from 'gatsby';
import { twMerge } from 'tailwind-merge';

interface StaticNavProps {
  setNavExpanded: Dispatch<SetStateAction<boolean>>;
  pageTransition: boolean;
}

export const StaticNav: React.FC<StaticNavProps> = ({
  setNavExpanded,
  pageTransition,
}) => {
  return (
    <nav
      className={twMerge('px-8', pageTransition && 'pointer-events-none')}
      arial-label="Main"
    >
      <ul className="flex flex-col gap-4">
        {config.navigation.map((navGroupItem, navGroupIndex: number) => (
          <NavGroup
            navGroupItem={navGroupItem}
            navGroupIndex={navGroupIndex}
            key={`navItem${navGroupIndex}`}
            setNavExpanded={setNavExpanded}
            pageTransition={pageTransition}
          />
        ))}
      </ul>
    </nav>
  );
};
