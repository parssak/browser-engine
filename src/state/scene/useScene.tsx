import { useContext, useMemo } from "react"
import { SceneContext } from "./SceneContext"
import context from "../../engine/core/EngineContext"
import { generateNewEntity } from "../../utils/entity.utils"
import { generateNewMaterial } from "../../utils/script.utils"
import useScripts from "../scripts/useScripts"

const useScene = () => {
  const {
    sceneConfig,
    setEntities,
    selectedEntityID,
    setSelectedEntityID,
    materials,
    setMaterials,
    selectedMaterialID,
    setSelectedMaterialID,
  } = useContext(SceneContext)

  const selectEntity = (id: Engine.EntityID) => {
    if (id === selectedEntityID) {
      context.selectEntity("")
      setSelectedEntityID("")
      return
    }
    context.selectEntity(id)
    setSelectedEntityID(id)
    setSelectedMaterialID("")
  }

  const selectedEntity: Engine.EntityProps | null = useMemo(() => {
    return sceneConfig.entities.find((e) => e.id === selectedEntityID) ?? null
  }, [sceneConfig, selectedEntityID])

  const selectedMaterial: Engine.Material | null = useMemo(() => {
    return sceneConfig.materials.find((e) => e.id === selectedMaterialID) ?? null
  }, [sceneConfig, selectedEntityID])

  const updateEntity = (entity: Engine.EntityProps) => {
    const index = sceneConfig.entities.findIndex((e) => e.id === entity.id)
    if (index === -1) {
      console.error(`Couldn't find ${entity.id} in sceneConfig.entities`)
    }
    sceneConfig.entities[index] = entity
    setEntities([...sceneConfig.entities])
  }

  const updateEntityParent = (
    child: Engine.EntityID,
    newParent: Engine.EntityID | null
  ) => {
    // TODO: Implement this
  }

  const createEntity = () => {
    const newEntity: Engine.EntityProps = generateNewEntity()
    setEntities([...sceneConfig.entities, newEntity])
    context.addNewEntity(newEntity)
  }

  const createMaterial = (
    materialName: string,
    vertexShaderID: Engine.ScriptID,
    fragmentShaderID: Engine.ScriptID
  ) => {
    const newMaterial = generateNewMaterial(
      materialName,
      vertexShaderID,
      fragmentShaderID
    )
    setMaterials([...materials, newMaterial])
  }

  const selectMaterial = (materialID: Engine.MaterialID) => {
    if (materialID === selectedMaterialID) {
      setSelectedMaterialID("")
      return
    }
    setSelectedMaterialID(materialID)
    setSelectedEntityID("")
  }

  return {
    sceneConfig,
    selectedEntity,
    selectedMaterial,
    createEntity,
    selectEntity,
    updateEntity,
    updateEntityParent,
    createMaterial,
    selectMaterial,
  }
}

export default useScene
