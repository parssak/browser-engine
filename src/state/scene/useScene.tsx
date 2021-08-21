import { useContext, useMemo, useRef } from "react";
import { SceneContext } from "./SceneContext";
import { v4 as uuidv4 } from 'uuid'

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
    const selected = sceneConfig.entities.flatMap(e => e.id === selectedEntityID && e)
    if (selected.length < 1) return null;
    return selected[0] || null;
  }, [sceneConfig, selectedEntityID]);

  console.debug({selectedEntity});

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