// create a typescript react global context and provider for SceneContext and SceneProvider
import * as THREE from 'three';
import { ReactElement, useMemo, useReducer } from 'react';
import { createContext } from 'react';
// import { IEntityProps, ISceneConfig } from '../types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ISceneContext {
  config: Engine.SceneConfig;
  setEntities: (props: Engine.EntityProps[]) => void;
  selectedEntity: string | null;
  setSelectedEntity: (entityID: string | null) => void;
};

const initialValue = {
  config: {
    entities: [] as Engine.EntityProps[],
    camera: {
      position: new THREE.Vector3(),
      fov: 70,
      near: 0.1,
      far: 1000,
      controls: "orbit" as Engine.ControlType
    }
  },
  setEntities: (props: Engine.EntityProps[]) => { },
  selectedEntity: null,
  setSelectedEntity: (entityID: string | null) => { }
};

export const SceneContext = createContext<ISceneContext>(initialValue);

export const SceneProvider = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const [cameraProps, setCameraProps] = useState<Engine.CameraProps>({
    position: new THREE.Vector3(),
    fov: 70,
    near: 0.1,
    far: 1000,
    controls: "orbit" as Engine.ControlType
  });
  const [entities, setEntities] = useState<Engine.EntityProps[]>([
    {
      id: uuidv4(),
      name: "Entity A",
      material: new THREE.MeshNormalMaterial(),
      geometry: new THREE.SphereBufferGeometry(),
      children: [],
      components: {}
    }
  ])
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  const contextValue = {
    config: { entities, camera: cameraProps },
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