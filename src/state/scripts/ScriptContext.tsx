import { ReactElement, useState } from 'react';
import { createContext } from 'react';

interface IScriptContext {
  scripts: Engine.Script[];
  selectedScript: Engine.Script | undefined;
  setScripts: (scripts: Engine.Script[]) => void;
  setSelectedScript: (script: Engine.Script | undefined) => void;
};

const initialValue: IScriptContext = {
  scripts: [],
  selectedScript: undefined,
  setScripts: (scripts: Engine.Script[]) => { },
  setSelectedScript: (script: Engine.Script | undefined) => { }
}

export const ScriptContext = createContext<IScriptContext>(initialValue);

export const ScriptProvider = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const [scripts, setScripts] = useState<Engine.Script[]>([]);
  const [selectedScript, setSelectedScript] = useState<Engine.Script | undefined>()

  const contextValue = { scripts, setScripts, selectedScript, setSelectedScript };
  
  return (
    <ScriptContext.Provider value={contextValue}>
      {children}
    </ScriptContext.Provider>
  );
};