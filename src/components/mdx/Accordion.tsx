import React, { ReactNode, PropsWithChildren, useEffect, useRef } from 'react';
import { IconCaretDown } from '../icons/IconCaretDown';
import { twMerge } from 'tailwind-merge';
import config from '../../../config';

const AccordionContext = React.createContext({
  active: null as string | null,
  setActive: (_: string | null): void => {},
});

export const Accordion: React.FC<PropsWithChildren> = ({ children }) => {
  const [active, setActive] = React.useState<string | null>(null);
  const ref = useRef(null) as React.MutableRefObject<HTMLDivElement | null>;
  const contextValue = React.useMemo(() => ({ active, setActive }), [active]);

  useEffect(() => {
    if (!active || !ref.current) return;
    const tabs: NodeListOf<HTMLDivElement> = ref.current.querySelectorAll(
      '[data-rel="AccordionContent"]'
    );
    const tab: HTMLDivElement | undefined = Array.from(tabs).find(
      (tab: HTMLDivElement) => tab.dataset.index === active
    );
    if (!tab || window.scrollY < tab.offsetTop) return;
    window.scrollTo({
      left: 0,
      top: tab.offsetTop - config.headerOffset,
      behavior: 'smooth',
    });
  }, [active]);

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className="md-container" ref={ref}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...{ index } });
          }
          return child;
        })}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  title: string | null;
  index: number;
  children: ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  index,
  children,
}) => {
  const { active, setActive } = React.useContext(AccordionContext);
  const itemId = `${title?.replace(' ', '_')}_${index}`;
  const hidden: boolean = itemId !== active;

  return (
    <div
      className="w-full overflow-hidden rounded-md shadow-md"
      data-rel="AccordionContent"
      data-index={itemId}
    >
      <button
        className="flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-t-md bg-secondary-bg p-4 text-sm font-semibold focus-visible:ring-inset"
        onClick={() => setActive(!hidden ? null : itemId)}
      >
        <p className="m-0" data-rel="title">
          {title}
        </p>
        <span
          className={twMerge(
            'inline-flex h-3 w-3 transition-all',
            !hidden ? 'rotate-180' : 'rotate-0'
          )}
        >
          <IconCaretDown />
        </span>
      </button>
      <div
        className="md-container mb-0 bg-white px-8 py-4 [&>p]:mt-[0.5rem]"
        hidden={hidden}
        aria-hidden={hidden}
      >
        {children}
      </div>
    </div>
  );
};
