import React from 'react';
import { Link } from 'gatsby';
import config from '../../config';
import { NavigationItemType } from '../interfaces/Config';
import flattenNavigation from '../utils/flattenNavigation';
import { twMerge } from 'tailwind-merge';

const { navigation } = config;

interface ChapterNavigationProps {
  currentSlug: string;
}

interface ChapterNavigationLinkProps {
  type: 'next' | 'previous';
  label: string;
  path: string;
}

const ChapterNavigationLink: React.FC<ChapterNavigationLinkProps> = ({
  type,
  path,
  label,
}) => {
  return (
    <Link
      className={twMerge(
        'discreet-link max-w-[50%] flex-1 rounded-xl border p-4 transition-all hover:shadow-md',
        type === 'next' && 'text-right'
      )}
      to={path}
    >
      <span className="mb-1 font-bold capitalize">{type}</span>
      <p className="mt-2">{label}</p>
    </Link>
  );
};

export const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  currentSlug,
}) => {
  let previous: any = null;
  let next: any = null;

  const flatNav = flattenNavigation(navigation);
  flattenNavigation(navigation).forEach(
    (nav: NavigationItemType, index: number) => {
      if (nav.path !== `/${currentSlug}`) return;
      if (index > 0) {
        previous = flatNav[index - 1];
      }
      if (index < flatNav.length - 1) {
        next = flatNav[index + 1];
      }
    }
  );

  return previous || next ? (
    <div
      className={`flex gap-8 py-8 ${
        previous ? 'justify-between' : 'justify-end'
      }`}
    >
      {previous && <ChapterNavigationLink {...previous} type="previous" />}
      {next && <ChapterNavigationLink {...next} type="next" />}
    </div>
  ) : null;
};
