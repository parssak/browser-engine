// create a typescript react global context and provider for SceneContext and SceneProvider
import * as THREE from 'three';
import { ReactElement, useMemo, useReducer } from 'react';
import { createContext } from 'react';
import { IEntityProps, ISceneConfig } from '../types';
import { useState } from 'react';
interface ISceneContext {
  config: ISceneConfig;
  setEntities: (props: IEntityProps[]) => void;
  selectedEntity: IEntityProps | null;
  setSelectedEntity: (props: IEntityProps) => void;
};

const initialValue = {
  config: {
    entities: []
  },
  setEntities: (props: IEntityProps[]) => { },
  selectedEntity: null,
  setSelectedEntity: (props: IEntityProps) => { }
};

export const SceneContext = createContext<ISceneContext>(initialValue);

export const SceneProvider = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const [entities, setEntities] = useState<IEntityProps[]>([
    {
      name: "Entity A",
      material: new THREE.MeshNormalMaterial(),
      geometry: new THREE.SphereBufferGeometry(),
    }
  ])
  const [selectedEntity, setSelectedEntity] = useState<IEntityProps | null>(null);

  const contextValue = {
    config: { entities },
    setEntities,
    selectedEntity,
    setSelectedEntity
  }
  return (
    <SceneContext.Provider value={contextValue}>
      {children}
    </SceneContext.Provider>
  );
}