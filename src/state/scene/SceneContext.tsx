import * as THREE from "three"
import { ReactElement, useEffect, useMemo } from "react"
import { createContext } from "react"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import context from "../../engine/core/EngineContext"

interface ISceneContext {
  sceneConfig: Engine.SceneConfig
  setEntities: (entities: Engine.EntityProps[]) => void
  selectedEntityID: string | null
  setSelectedEntityID: (entityID: Engine.EntityID | null) => void
  selectedMaterialID: string | null
  setSelectedMaterialID: (materialID: Engine.MaterialID | null) => void
  materials: Record<string, Engine.MaterialProps>
  setMaterials: (materials: Record<string, Engine.MaterialProps>) => void
}

const initialValue = {
  sceneConfig: {
    entities: [] as Engine.EntityProps[],
    camera: {
      position: new THREE.Vector3(),
      fov: 70,
      near: 0.1,
      far: 1000,
      controls: "orbit" as Engine.ControlType,
    },
    materials: [],
  },
  selectedEntityID: null,
  selectedMaterialID: null,
  setEntities: (entities: Engine.EntityProps[]) => {},
  setSelectedEntityID: (entityID: string | null) => {},
  setSelectedMaterialID: (materialID: string | null) => {},
  setCameraProps: (cameraProps: Engine.CameraProps) => {},
  materials: {},
  setMaterials: (materials: Record<string, Engine.MaterialProps>) => {},
}

export const SceneContext = createContext<ISceneContext>(initialValue)

export const SceneProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[]
}) => {
  // entities
  const [entities, setEntities] = useState<Engine.EntityProps[]>([
    {
      id: uuidv4(),
      name: "Main Camera",
      type: "camera",
      visible: true,
      castShadow: false,
      receiveShadow: false,
      children: [],
      components: {
        Transform: {
          position: { x: 0, y: 5, z: -5 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      cameraProps: {
        fov: 70,
        near: 0.1,
        far: 1000,
      },
    },
    {
      id: uuidv4(),
      name: "Ambient Light",
      type: "light",
      visible: true,
      castShadow: false,
      receiveShadow: false,
      children: [],
      components: {
        Transform: {
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 6, y: 6, z: 6 },
        },
      },
      lightProps: {
        type: "ambient",
        color: "#ffffff",
        intensity: 0.4,
      },
    },
    {
      id: uuidv4(),
      name: "Directional Light",
      type: "light",
      visible: true,
      castShadow: true,
      receiveShadow: true,
      children: [],
      components: {
        Transform: {
          position: { x: 0, y: 10, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      lightProps: {
        type: "directional",
        color: "#ffffff",
        intensity: 0.1,
      },
    },

    {
      id: uuidv4(),
      name: "Plane",
      type: "basic",
      visible: true,
      castShadow: true,
      receiveShadow: true,
      material: "phong",
      geometry: "plane",
      children: [],
      components: {
        Transform: {
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
    },
  ])
  const [selectedEntityID, setSelectedEntityID] = useState<string | null>(null)

  // materials
  const [selectedMaterialID, setSelectedMaterialID] = useState<string | null>(null)
  const [materials, setMaterials] = useState<Record<string, Engine.MaterialProps>>(
    {} as Record<string, Engine.MaterialProps>
  )

  const sceneConfig: Engine.SceneConfig = useMemo(
    () => ({
      entities,
      materials: Object.values(materials),
    }),
    [entities, materials]
  )

  // useEffect(() => {
  //   context.updateSceneMaterials(Object.values(materials))
  // }, [materials])
    

  useEffect(() => {
    if (selectedEntityID) {
      const entityProps = entities.find((e) => e.id === selectedEntityID)
      if (!entityProps) return
      context.updateSpecificEntity(selectedEntityID, entityProps)
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneConfig])

  const contextValue = {
    sceneConfig,
    selectedEntityID,
    selectedMaterialID,
    setEntities,
    setSelectedEntityID,
    setSelectedMaterialID,
    materials,
    setMaterials,
  }
  return <SceneContext.Provider value={contextValue}>{children}</SceneContext.Provider>
}
