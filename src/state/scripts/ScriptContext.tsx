import { ReactElement, useState } from 'react';
import { createContext } from 'react';

interface IScriptContext {
  scripts: Engine.Script[];
  setScripts: (scripts: Engine.Script[]) => void;
};

const initialValue: IScriptContext = {
  scripts: [],
  setScripts: (scripts: Engine.Script[]) => { }
}

export const ScriptContext = createContext<IScriptContext>(initialValue);

export const ScriptProvider = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const [scripts, setScripts] = useState<Engine.Script[]>([]);
  const contextValue = { scripts, setScripts };
  
  return (
    <ScriptContext.Provider value={contextValue}>
      {children}
    </ScriptContext.Provider>
  );
};