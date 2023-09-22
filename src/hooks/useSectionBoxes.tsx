import React, {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from 'react';

interface SectionBoxesContextType {
  sectionsList: string[];
  setSectionsList: Dispatch<SetStateAction<Array<string>>>;
  activeSectionIndex: number;
  setActiveSectionIndex: Dispatch<SetStateAction<number>>;
}

const SectionBoxesContext = createContext<SectionBoxesContextType>({
  sectionsList: [],
  setSectionsList: () => {},
  activeSectionIndex: -1,
  setActiveSectionIndex: () => {},
});

export const SectionBoxesProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [sectionsList, setSectionsList] = useState<Array<string>>([]);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(-1);

  return (
    <SectionBoxesContext.Provider
      value={{
        sectionsList,
        setSectionsList,
        activeSectionIndex,
        setActiveSectionIndex,
      }}
    >
      {children}
    </SectionBoxesContext.Provider>
  );
};

export const useSectionBoxesContext = () => useContext(SectionBoxesContext);
