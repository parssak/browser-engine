// create a typescript react global context and provider for SceneContext and SceneProvider
import * as THREE from 'three';
import { ReactElement, useMemo } from 'react';
import { createContext } from 'react';
import { ISceneConfig } from '../types';
interface ISceneContext {
  config: ISceneConfig;
};

const initialValue = {
  config: {
    entities: [
      {
        name: "Entity A",
        material: new THREE.MeshNormalMaterial()
      }
    ]
  }
};

export const SceneContext = createContext<ISceneContext>(initialValue);

export const SceneProvider = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return (
    <SceneContext.Provider value={initialValue}>
      {children}
    </SceneContext.Provider>
  );
}