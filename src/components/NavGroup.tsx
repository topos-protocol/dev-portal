import { NavItem } from './NavItem';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useCollapse } from 'react-collapsed';
import config from '../../config';
import { NavigationItemType } from '../interfaces/Config';
import { IconCaretDown } from './icons/IconCaretDown';
import { Link } from 'gatsby';
import { BiCollapseVertical, BiExpandVertical } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';

interface NavGroupItem {
  label: string;
  path?: string;
  content?: Array<NavigationItemType>;
}

interface NavGroupProps {
  navGroupItem: NavigationItemType;
  navGroupIndex: number;
  setNavExpanded: Dispatch<SetStateAction<boolean>>;
  pageTransition: boolean;
}

export const NavGroup: React.FC<NavGroupProps> = React.memo(({
  navGroupItem,
  navGroupIndex,
  setNavExpanded,
  pageTransition,
}) => {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  const toggleExpanded = useCallback(() => {
    setExpanded((prevExpanded) => {
      console.log(!prevExpanded);
      return !prevExpanded});
  }, []);

  // if (navGroupItem.path && !isExpanded) setExpanded(true);

  return (
    <li
      className="flex flex-col gap-2"
      key={`navGroup${navGroupIndex}`}
      {...getToggleProps({
        onClick: toggleExpanded,
      })}
    >
      {navGroupItem.path ? (
        <strong>
          {isExpanded ? (
            <BiCollapseVertical
              style={{ marginTop: '3px', float: 'left', marginRight: '0.5rem' }}
            />
          ) : (
            <BiExpandVertical
              style={{ marginTop: '3px', float: 'left', marginRight: '0.5rem' }}
            />
          )}
          <Link
            className="hover:text-action-reg"
            to={navGroupItem.path}
            activeClassName="nav-item-active"
            onClick={() => setNavExpanded(false)}
            getProps={(props) => {
              if (props.isCurrent && !isExpanded) {
                // setExpanded(true);
              }

              return {
                className: props.isCurrent
                  ? 'nav-item-active'
                  : 'hover:text-action-reg',
              };
            }}
          >
            {navGroupItem.label}
          </Link>
        </strong>
      ) : (
        <strong>
          {isExpanded ? (
            <BiCollapseVertical
              style={{ marginTop: '3px', float: 'left', marginRight: '0.5rem' }}
            />
          ) : (
            <BiExpandVertical
              style={{ marginTop: '3px', float: 'left', marginRight: '0.5rem' }}
            />
          )}
          {navGroupItem.label}
        </strong>
      )}
      {navGroupItem.content && (
        <ul onClick={(event) => event.stopPropagation()} className={`flex flex-col gap-2`} {...getCollapseProps()}>
          {navGroupItem.content.map(
            (navItem: NavigationItemType, navItemIndex: number) => (
              <NavItem
                navItem={navItem}
                key={`navItem${navItemIndex}`}
                isExpanded={isExpanded}
                setExpanded={setExpanded}
                setNavExpanded={setNavExpanded}
              />
            )
          )}
        </ul>
      )}
    </li>
  );
});
