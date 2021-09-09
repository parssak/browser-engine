import { useContext, useMemo } from "react"
import { SceneContext } from "./SceneContext"
import context from "../../engine/core/EngineContext"
import {  generateNewMaterial } from "../../utils/script.utils"

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
    setSelectedMaterialID("")
    setSelectedEntityID(id)
  }

  const selectedEntity: Engine.EntityProps | null = useMemo(() => {
    return sceneConfig.entities.find((e) => e.id === selectedEntityID) ?? null
  }, [sceneConfig, selectedEntityID])

  const selectedMaterial: Engine.MaterialProps | null = useMemo(() => {
    return sceneConfig.materials.find((e) => e.id === selectedMaterialID) ?? null
  }, [sceneConfig, selectedMaterialID])
  
  const updateEntity = (entity: Engine.EntityProps) => {
    const index = sceneConfig.entities.findIndex((e) => e.id === entity.id)
    if (index === -1) {
      console.error(`Couldn't find ${entity.id} in sceneConfig.entities`)
    }
    sceneConfig.entities[index] = entity
    setEntities([...sceneConfig.entities])
  }

  const removeEntity = (entityID: Engine.EntityID) => {
    const index = sceneConfig.entities.findIndex((e) => e.id === entityID)
    if (index === -1) {
      console.error(`Couldn't find ${entityID} in sceneConfig.entities`)
    }
    sceneConfig.entities.splice(index, 1)
    setEntities([...sceneConfig.entities])
    context.removeEntity(entityID);
  }

  const updateEntityParent = (
    child: Engine.EntityID,
    newParent: Engine.EntityID | null
  ) => {
    // TODO: Implement this
  }

  const createEntity = (entity: Engine.EntityProps) => {
    setEntities([...sceneConfig.entities, entity])
    context.addNewEntity(entity)
  }

  const createMaterial = (
    materialName: string,
    vertexShaderID: Engine.ScriptID,
    fragmentShaderID: Engine.ScriptID
  ) => {
    const updatedMaterialsObject = materials;
    const newMaterial = generateNewMaterial(
      materialName,
      vertexShaderID,
      fragmentShaderID
    )
    updatedMaterialsObject[materialName] = newMaterial;
    setMaterials({...updatedMaterialsObject})
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
    removeEntity,
    updateEntityParent,
    createMaterial,
    selectMaterial,
    _setEntities: setEntities,
    _setMaterials: setMaterials,
  }
}

export default useScene
