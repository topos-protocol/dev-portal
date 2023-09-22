import React from 'react';
import './src/styles/global.scss';
import 'prismjs/plugins/command-line/prism-command-line.css';
import { AnimatePresence } from 'framer-motion';
import config from './config';

export const wrapPageElement = ({ element }) => (
  <AnimatePresence mode="wait" initial={false}>
    {element}
  </AnimatePresence>
);

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  const TRANSITION_DELAY = config.pageTransitionDuration * 1000 * 2;
  if (location.hash) return;
  if (location.action === 'PUSH') {
    window.setTimeout(() => window.scrollTo(0, 0), TRANSITION_DELAY);
  } else {
    const savedPosition = getSavedScrollPosition(location) || [0, 0];
    window.setTimeout(
      () => window.scrollTo(...savedPosition),
      TRANSITION_DELAY
    );
  }
  return false;
};
