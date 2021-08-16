// create a typescript react global context and provider for SceneContext and SceneProvider
import * as THREE from 'three';
import { ReactElement, useMemo, useReducer } from 'react';
import { createContext } from 'react';
import { IEntityProps, ISceneConfig } from '../types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ISceneContext {
  config: ISceneConfig;
  setEntities: (props: IEntityProps[]) => void;
  selectedEntity: string | null;
  setSelectedEntity: (entityID: string) => void;
};

const initialValue = {
  config: {
    entities: []
  },
  setEntities: (props: IEntityProps[]) => { },
  selectedEntity: null,
  setSelectedEntity: (entityID: string) => { }
};

export const SceneContext = createContext<ISceneContext>(initialValue);

export const SceneProvider = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const [entities, setEntities] = useState<IEntityProps[]>([
    {
      id: uuidv4(),
      name: "Entity A",
      material: new THREE.MeshNormalMaterial(),
      geometry: new THREE.SphereBufferGeometry(),
    }
  ])
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

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