import * as THREE from 'three';
import { ReactElement, useMemo } from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ISceneContext {
  sceneConfig: Engine.SceneConfig;
  setEntities: (props: Engine.EntityProps[]) => void;
  selectedEntityID: string | null;
  setSelectedEntityID: (entityID: string | null) => void;
  setCameraProps: (cameraProps: Engine.CameraProps) => void;
};

const initialValue = {
  sceneConfig: {
    entities: [] as Engine.EntityProps[],
    camera: {
      position: new THREE.Vector3(),
      fov: 70,
      near: 0.1,
      far: 1000,
      controls: "orbit" as Engine.ControlType
    }
  },
  selectedEntityID: null,
  setEntities: (entities: Engine.EntityProps[]) => { },
  setSelectedEntityID: (entityID: string | null) => { },
  setCameraProps: (cameraProps: Engine.CameraProps) => { }
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
      material: 'normal',
      geometry: 'box',
      children: [],
      components: {
        "transform": {
          position: [3, 0, 0],
          rotation: [0, 0, 0],
          scale: [2, 1, 1],
        },
      }
    },
  ])
  const [selectedEntityID, setSelectedEntityID] = useState<string | null>(null);
  const sceneConfig = useMemo(() => ({ entities, camera: cameraProps }), [entities, cameraProps]);

  const contextValue = {
    sceneConfig,
    selectedEntityID,
    setEntities,
    setCameraProps,
    setSelectedEntityID
  }
  return (
    <SceneContext.Provider value={contextValue}>
      {children}
    </SceneContext.Provider>
  );
}