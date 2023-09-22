import React, { ReactNode } from 'react';
import { IconArrowRight } from '../icons/IconArrowRight';

interface CodeBlockProps {
  title?: string;
  url?: string;
  children: ReactNode;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  url,
  children,
  title,
}) => {
  return (
    <div className={`no-gap relative ${url ? 'codeblock' : ''}`}>
      {title && (
        <div className="absolute left-3 top-1.5 z-10 max-w-[80%] whitespace-nowrap font-mono text-xs text-white">
          {title}
        </div>
      )}
      {children}
      {url && (
        <div className="rounded-b-xl bg-code-top px-3 py-1.5 text-right text-sm">
          <a
            className="discreet-link group inline-flex items-center justify-center gap-1 text-white opacity-80 hover:opacity-100"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="translate-x-4 transition group-hover:translate-x-0">
              View source
            </span>
            <span className="inline-flex h-4 w-4 -translate-x-4 opacity-0 transition group-hover:-translate-x-0 group-hover:opacity-100">
              <IconArrowRight />
            </span>
          </a>
        </div>
      )}
    </div>
  );
};
