import { useContext, useRef } from "react";
import { SceneContext } from "./SceneContext";
import { v4 as uuidv4 } from 'uuid'

const useScene = () => {
  const { sceneConfig, setEntities, selectedEntity, setSelectedEntity } = useContext(SceneContext);

  const selectEntity = (id: Engine.EntityID) => {
    setSelectedEntity(id);
  };

  const updateEntity = (entity: Engine.EntityProps) => {
    // TODO: Implement this
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