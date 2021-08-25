import { ReactElement, useEffect, useRef } from 'react';
import { createContext } from 'react';

interface IEditorContext {
  renderElement?: React.MutableRefObject<HTMLDivElement | null>;
};

const initialValue: IEditorContext = {}

export const EditorContext = createContext<IEditorContext>(initialValue);

export const EditorProvider = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const renderElement = useRef<HTMLDivElement>(null)
  const contextValue = { renderElement };


  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
};