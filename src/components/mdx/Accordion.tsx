import React, { ReactNode, PropsWithChildren, useEffect, useRef } from 'react';
import { IconCaretDown } from '../icons/IconCaretDown';
import { twMerge } from 'tailwind-merge';
import config from '../../../config';

const AccordionContext = React.createContext({
  activeIndex: -1,
  setActiveIndex: (_: number): void => {},
});

export const Accordion: React.FC<PropsWithChildren> = ({ children }) => {
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const ref = useRef(null) as React.MutableRefObject<HTMLDivElement | null>;
  const contextValue = React.useMemo(
    () => ({ activeIndex, setActiveIndex }),
    [activeIndex]
  );

  useEffect(() => {
    if (activeIndex < 0 || !ref.current) return;
    const activeTab = ref.current.querySelectorAll(
      '[data-rel="AccordionContent"]'
    )[activeIndex] as HTMLDivElement | null;
    if (!activeTab || window.scrollY < activeTab.offsetTop) return;
    window.scrollTo({
      left: 0,
      top: activeTab.offsetTop - config.headerOffset,
      behavior: 'smooth',
    });
  }, [activeIndex]);

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
  title: string;
  index: number;
  children: ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  index,
  children,
}) => {
  const { activeIndex, setActiveIndex } = React.useContext(AccordionContext);
  const hidden: boolean = index !== activeIndex;

  return (
    <div
      className="w-full overflow-hidden rounded-md shadow-md"
      data-rel="AccordionContent"
    >
      <button
        className="flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-t-md bg-secondary-bg p-4 text-sm font-semibold focus-visible:ring-inset"
        onClick={() => setActiveIndex(index == activeIndex ? -1 : index)}
      >
        <p className="m-0">{title}</p>
        <span
          className={twMerge(
            'inline-flex h-3 w-3 transition-all',
            index == activeIndex ? 'rotate-180' : 'rotate-0'
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
