import { Component, ReactElement, useEffect, useState } from 'react';
import { createContext } from 'react';
import ComponentManager from '../../engine/core/ComponentManager';
import { formatScriptString } from '../../utils/script.utils';

interface IScriptContext {
  scripts: Engine.Script[];
  selectedScript: Engine.Script | undefined;
  setScripts: (scripts: Engine.Script[]) => void;
  setSelectedScript: (script: Engine.Script | undefined) => void;
  compileScripts: () => void;
};

const initialValue: IScriptContext = {
  scripts: [],
  selectedScript: undefined,
  setScripts: (scripts: Engine.Script[]) => { },
  setSelectedScript: (script: Engine.Script | undefined) => { },
  compileScripts: () => { }
}

export const ScriptContext = createContext<IScriptContext>(initialValue);

export const ScriptProvider = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const [scripts, setScripts] = useState<Engine.Script[]>([]);
  const [selectedScript, setSelectedScript] = useState<Engine.Script | undefined>()

  const compileScripts = () => {
    scripts.forEach(script => {
      try {
        const formattedScript = formatScriptString(script);
        const NewComponent: any = eval(`(${formattedScript})`);
        Object.setPrototypeOf(NewComponent, Component);
        const scriptCopy = `${script.content}`;
        const removePrefix = scriptCopy.substring(scriptCopy.indexOf("// <public>") + 11);
        // take substring of entire string justPublic until // </public>
        let pureProps = removePrefix.substring(0, removePrefix.indexOf("// </public>"));
        pureProps = pureProps.replace(';', ',');
        pureProps = pureProps.replace('=', ':');
        let props = {};
        if (`${pureProps}`.replace(/\s/g, "").length) {
          pureProps = `{${pureProps}}`
          props = eval(`(${pureProps})`);
        }
        console.debug('props>>', props);
        ComponentManager.instance.registerComponent(script.name, NewComponent, props);
      } catch (err) {
        alert(err?.message);
      }
    }
    )
  }

  useEffect(() => {
    compileScripts();
  }, [scripts])

  const contextValue = { scripts, setScripts, selectedScript, setSelectedScript, compileScripts };

  return (
    <ScriptContext.Provider value={contextValue}>
      {children}
    </ScriptContext.Provider>
  );
};