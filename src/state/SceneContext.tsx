// create a typescript react global context and provider for SceneContext and SceneProvider
import { ReactElement, useMemo } from 'react';
import { createContext } from 'react';
import { scene as activeScene } from '../engine/core';
import Scene from '../engine/core/Scene';

interface ISceneContext {
  scene: Scene | undefined;
};

const initialValue = {
  scene: undefined
};

export const SceneContext = createContext<ISceneContext>(initialValue);

export const SceneProvider = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const scene = useMemo(() => activeScene, []);
    return (
      <SceneContext.Provider value={{scene}}>
            {children}
        </SceneContext.Provider>
    );
}