import React, { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface TabGroupItemProps {
  title: string;
  index: number;
  active?: boolean;
  children: ReactNode;
}

interface TabGroupContextType {
  activeTabIndex: number;
  setActiveTabIndex: Dispatch<SetStateAction<number>>;
}

const TabGroupContext = React.createContext<TabGroupContextType>({
  activeTabIndex: -1,
  setActiveTabIndex: () => {},
});

export const TabGroup: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const contextValue = React.useMemo(
    () => ({ activeTabIndex, setActiveTabIndex }),
    [activeTabIndex]
  );

  return (
    <TabGroupContext.Provider value={contextValue}>
      <div className="tabgroup rounded-xl border">
        <div className="tablist ml-0 flex list-none gap-1 border-b" role="tablist">
          {React.Children.map(children, (child: any, index) => {
            const { title } = child.props;
            const isActive = activeTabIndex === index;
            return (
              <div key={index} className="list-none" role="presentation">
                <button
                  role="tab"
                  className={twMerge(
                    'relative inline-flex px-6 py-3 transition-all ease-in-out hover:text-action-reg',
                    isActive && 'text-action-reg'
                  )}
                  onClick={() => setActiveTabIndex(index)}
                >
                  {title}
                  <span
                    className={twMerge(
                      'absolute -bottom-[2px] left-0 h-[3px] bg-action-reg transition-all',
                      isActive
                        ? 'left-0 w-full opacity-100'
                        : 'left-[50%] w-0 opacity-0'
                    )}
                  />
                </button>
              </div>
            );
          })}
        </div>
        <div className="p-6">
          {React.Children.map(children, (child, index) =>
            React.isValidElement(child)
              ? React.cloneElement(child, { ...{ index } })
              : child
          )}
        </div>
      </div>
    </TabGroupContext.Provider>
  );
};

export const TabGroupItem: React.FC<TabGroupItemProps> | {} = ({
  children,
  index,
  active,
}) => {
  const { activeTabIndex, setActiveTabIndex } =
    React.useContext(TabGroupContext);

  useEffect(() => {
    if (active) setActiveTabIndex(index);
  }, [active]);

  return (
    <div
      className="md-container"
      hidden={index !== activeTabIndex}
      role="tabpanel"
    >
      {children}
    </div>
  );
};
