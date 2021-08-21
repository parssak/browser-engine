import { useContext, useEffect, useMemo, useRef } from "react";
import { SceneContext } from "./SceneContext";
import { v4 as uuidv4 } from 'uuid'
// import { flattenEntities } from "./scene.utils";
import { deepClone } from "../../utils";

const useScene = () => {
  const { sceneConfig, setEntities, selectedEntityID, setSelectedEntityID } = useContext(SceneContext);

  const selectEntity = (id: Engine.EntityID) => {
    if (id === selectedEntityID) {
      setSelectedEntityID('')
      return;
    }
    setSelectedEntityID(id);
  };

  const selectedEntity: Engine.EntityProps | null = useMemo(() => {
    // const entities = deepClone<Engine.EntityProps[]>(sceneConfig.entities);
    // const flattenedEntities = flattenEntities(entities);
    return sceneConfig.entities.find(e => e.id === selectedEntityID) ?? null;
  }, [sceneConfig, selectedEntityID]);

  const updateEntity = (entity: Engine.EntityProps) => {
    console.debug("Called update entity", entity);
    // 1. Find index of entity in sceneConfig.entities
    const index = sceneConfig.entities.findIndex(e => e.id === entity.id);
    // if (index === -1) {
      // console.error("Couldn't find "
    // 2. Update entity in sceneConfig.entities
    // 3. Call setEntities(sceneConfig.entities)

    
    // TODO: Make sure actual scene updates when doing this
  }

  const updateEntityParent = (child: Engine.EntityID, newParent: Engine.EntityID | null) => {
    // TODO: Implement this
  }

  const createEntity = () => {
    const newEntity: Engine.EntityProps = {
      id: uuidv4(),
      name: "New Entity",
      children: [],
      components: {},
    }
    setEntities([...sceneConfig.entities, newEntity]);
  }

  return {
    sceneConfig,
    selectedEntity, 
    createEntity, 
    selectEntity,
    updateEntity,
    updateEntityParent,
  };
}

export default useScene;