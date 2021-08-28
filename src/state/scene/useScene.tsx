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
  } = useContext(SceneContext)


  const selectEntity = (id: Engine.EntityID) => {
    if (id === selectedEntityID) {
      context.selectEntity("")
      setSelectedEntityID("")
      return
    }
    context.selectEntity(id)
    setSelectedEntityID(id)
  }

  const selectedEntity: Engine.EntityProps | null = useMemo(() => {
    return sceneConfig.entities.find((e) => e.id === selectedEntityID) ?? null
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
    fragmentShaderID: Engine.ScriptID,
  ) => {
    const newMaterial = generateNewMaterial(materialName, vertexShaderID, fragmentShaderID);
    setMaterials([...materials, newMaterial])
  }

  return {
    sceneConfig,
    selectedEntity,
    createEntity,
    selectEntity,
    updateEntity,
    updateEntityParent,
    createMaterial,
  }
}

export default useScene
