import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface GridItemProps extends GridProps {
  index: number;
  itemsCount: number;
}

interface GridProps {
  columns: 3 | 2;
}

export const GridItem: React.FC<PropsWithChildren<GridItemProps>> = ({
  children,
  index,
  itemsCount,
  columns,
}) => {
  const isLast = index === itemsCount - 1;
  const position = (index + 1) % columns;
  return (
    <div
      className={twMerge(
        'grid',
        isLast &&
          position === 1 &&
          (columns === 3 ? 'sm:col-span-3' : 'sm:col-span-2'),
        isLast && position === 2 && 'sm:col-span-2'
      )}
    >
      {children}
    </div>
  );
};

export const Grid: React.FC<PropsWithChildren<GridProps>> = ({
  children,
  columns = 3,
}) => {
  const itemsCount = React.Children.count(children);
  return (
    <div
      className={twMerge(
        'grid gap-6 sm:grid-cols-2',
        columns === 3 && 'xl:grid-cols-3'
      )}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...{ index, itemsCount, columns },
          });
        }
        return child;
      })}
    </div>
  );
};
