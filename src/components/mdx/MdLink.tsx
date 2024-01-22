import React from 'react';
import config from '../../../config';

interface LinkProps extends React.HTMLAttributes<HTMLLinkElement> {
  href?: string;
}

export const MdLink: React.FC<LinkProps> = ({ href, children }) => {
  if (!href) return null;
  const isExternal =
    (!href.startsWith('#') &&
      !href.startsWith('/') &&
      !href.startsWith('./') &&
      !href.startsWith('../') &&
      !new URL(href).origin.startsWith(config.rootUrl)) ||
    href.startsWith('mailto:');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener norefferer' : ''}
    >
      {children}
    </a>
  );
};
