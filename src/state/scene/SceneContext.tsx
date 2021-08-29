import * as THREE from "three"
import { ReactElement, useEffect, useMemo } from "react"
import { createContext } from "react"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import context from "../../engine/core/EngineContext"

interface ISceneContext {
  sceneConfig: Engine.SceneConfig
  setEntities: (props: Engine.EntityProps[]) => void
  selectedEntityID: string | null
  setSelectedEntityID: (entityID: string | null) => void
  selectedMaterialID: string | null
  setSelectedMaterialID: (materialID: string | null) => void
  setCameraProps: (cameraProps: Engine.CameraProps) => void
  materials: Engine.Material[]
  setMaterials: (materials: Engine.Material[]) => void
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
  setSelectedEntityID: (entityID: string | null) => { },
  setSelectedMaterialID: (materialID: string | null) => { },
  setCameraProps: (cameraProps: Engine.CameraProps) => {},
  materials: [],
  setMaterials: (materials: Engine.Material[]) => {},
}

export const SceneContext = createContext<ISceneContext>(initialValue)

export const SceneProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[]
}) => {
  const [cameraProps, setCameraProps] = useState<Engine.CameraProps>({
    position: new THREE.Vector3(),
    fov: 70,
    near: 0.1,
    far: 1000,
    controls: "orbit" as Engine.ControlType,
  })

  const [entities, setEntities] = useState<Engine.EntityProps[]>([
    {
      id: uuidv4(),
      name: "Entity A",
      material: "normal",
      geometry: "box",
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
  const [selectedMaterialID, setSelectedMaterialID] = useState<string | null>(null)

  const [materials, setMaterials] = useState<Engine.Material[]>(
    [] as Engine.Material[]
  )
  const sceneConfig = useMemo(
    () => ({
      entities,
      camera: cameraProps,
      materials,
    }),
    [entities, cameraProps, materials]
  )

  useEffect(() => {
    if (selectedEntityID) {
      const entityProps = entities.find((e) => e.id === selectedEntityID)
      if (!entityProps) return
      context.updateSpecificEntity(selectedEntityID, entityProps)
    }
  }, [sceneConfig])

  const contextValue = {
    sceneConfig,
    selectedEntityID,
    selectedMaterialID,
    setEntities,
    setCameraProps,
    setSelectedEntityID,
    setSelectedMaterialID,
    materials,
    setMaterials,
  }
  return (
    <SceneContext.Provider value={contextValue}>{children}</SceneContext.Provider>
  )
}
