// create a typescript react global context and provider for SceneContext and SceneProvider
import { ReactElement, useMemo } from 'react';
import { createContext } from 'react';
import { ISceneConfig } from '../types';
interface ISceneContext {
  config: ISceneConfig;
};

const initialValue = {
  config: { entities: [] }
};

export const SceneContext = createContext<ISceneContext>(initialValue);

export const SceneProvider = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return (
    <SceneContext.Provider value={initialValue}>
      {children}
    </SceneContext.Provider>
  );
}