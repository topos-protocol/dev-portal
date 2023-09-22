import React from 'react';
import config from '../../config';
import { Link } from 'gatsby';
import { NavigationItemType } from '../interfaces/Config';

export const Footer: React.FC = () => {
  const { footerLinks, siteTitle } = config;
  return (
    <footer className="flex justify-end md:ml-[15rem] md:mr-4 md:px-4 lg:mr-64 lg:px-6 xl:mx-72 xl:px-8">
      <div className="flex max-w-[1216px] flex-1 flex-col items-center justify-between gap-4 border-t py-8 text-sm text-neutral-500 md:flex-row md:py-12">
        {footerLinks && footerLinks.length && (
          <nav arial-label="Secondary">
            <ul className="flex gap-2">
              {footerLinks.map(({ label, path }: NavigationItemType) => (
                <li key={label}>
                  <Link to={`${path}`}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <span>© 2023 All rights reserved zk Foundation</span>
      </div>
    </footer>
  );
};
