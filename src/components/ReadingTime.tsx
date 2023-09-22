import React, { RefObject, useEffect } from 'react';

interface ReadingTimeProps {
  mainRef: RefObject<HTMLDivElement>;
}

const WPM = 112;

const getReadingTime = (node: HTMLDivElement): number => {
  const content = node.textContent;
  if (!content) return 0;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / WPM);
};

const appendReadingTime = (node: HTMLDivElement, time: number) => {
  if (!node || time === 0) return;
  const pageTitleNode = node.querySelector('h1');
  if (node.querySelector('[data-reading-time]')) return;
  pageTitleNode?.insertAdjacentHTML(
    'beforeend',
    `
    <div
      data-reading-time
      class="flex items-center gap-1 text-xs text-neutral-500 font-semibold uppercase mt-4"
    >
      <span class="inline-flex w-4 h-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
      ${time} min${time > 1 ? 's' : ''} read
    </div>
  `.trim()
  );
};

export const ReadingTime: React.FC<ReadingTimeProps> = ({ mainRef }): null => {
  useEffect(() => {
    if (!mainRef.current) return;
    const time = getReadingTime(mainRef.current);
    if (!time) return;
    appendReadingTime(mainRef.current, time);
  }, [mainRef]);
  return null;
};
