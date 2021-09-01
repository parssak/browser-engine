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
  setCameraProps: (cameraProps: Engine.CameraProps) => void
  materials: Record<string, Engine.MaterialProps>
  setMaterials: (materials: Record<string, Engine.MaterialProps>) => void
  selectedLightID: string | null
  setSelectedLightID: (lightID: Engine.LightID | null) => void
  lights: Engine.LightProps[]
  setLights: (lights: Engine.LightProps[]) => void
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
    lights: [] as Engine.LightProps[],
  },
  selectedEntityID: null,
  selectedMaterialID: null,
  setEntities: (entities: Engine.EntityProps[]) => {},
  setSelectedEntityID: (entityID: string | null) => {},
  setSelectedMaterialID: (materialID: string | null) => {},
  setCameraProps: (cameraProps: Engine.CameraProps) => {},
  materials: {},
  setMaterials: (materials: Record<string, Engine.MaterialProps>) => {},
  lights: [],
  setLights: (lights: Engine.LightProps[]) => { },
  selectedLightID: null,
  setSelectedLightID: (lightID: Engine.LightID | null) => { }
}

export const SceneContext = createContext<ISceneContext>(initialValue)

export const SceneProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[]
}) => {
  // camera
  const [cameraProps, setCameraProps] = useState<Engine.CameraProps>({
    position: new THREE.Vector3(),
    fov: 70,
    near: 0.1,
    far: 1000,
    controls: "orbit" as Engine.ControlType,
  })

  // entities
  const [entities, setEntities] = useState<Engine.EntityProps[]>([
    {
      id: uuidv4(),
      name: "Entity A",
      material: "phong",
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

  // materials
  const [selectedMaterialID, setSelectedMaterialID] = useState<string | null>(null)
  const [materials, setMaterials] = useState<Record<string, Engine.MaterialProps>>(
    {} as Record<string, Engine.MaterialProps>
  )

  // lights
  const [lights, setLights] = useState<Engine.LightProps[]>([]);
  const [selectedLightID, setSelectedLightID] = useState<Engine.LightID | null>(null)

  const sceneConfig: Engine.SceneConfig = useMemo(
    () => ({
      entities,
      camera: cameraProps,
      materials: Object.values(materials),
      lights
    }),
    [entities, cameraProps, materials, lights]
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
    lights,
    setLights,
    selectedLightID,
    setSelectedLightID,
  }
  return <SceneContext.Provider value={contextValue}>{children}</SceneContext.Provider>
}
