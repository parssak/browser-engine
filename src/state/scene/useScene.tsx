import { useContext, useEffect, useMemo} from "react";
import { SceneContext } from "./SceneContext";
import { v4 as uuidv4 } from 'uuid'
import context from "../../engine/core/EngineContext";

const useScene = () => {
  const { sceneConfig, setEntities, selectedEntityID, setSelectedEntityID } = useContext(SceneContext);


  const selectEntity = (id: Engine.EntityID) => {
    if (id === selectedEntityID) {
      setSelectedEntityID('')
      return;
    }
    context.selectEntity(id);
    setSelectedEntityID(id);
  };

  const selectedEntity: Engine.EntityProps | null = useMemo(() => {
    return sceneConfig.entities.find(e => e.id === selectedEntityID) ?? null;
  }, [sceneConfig, selectedEntityID]);


  const updateEntity = (entity: Engine.EntityProps) => {
    const index = sceneConfig.entities.findIndex(e => e.id === entity.id);
    if (index === -1) {
      console.error(`Couldn't find ${entity.id} in sceneConfig.entities`);
    };
    sceneConfig.entities[index] = entity;
    setEntities([...sceneConfig.entities]);
  }

  const updateEntityParent = (child: Engine.EntityID, newParent: Engine.EntityID | null) => {
    // TODO: Implement this
  }

  const createEntity = () => {
    const id = uuidv4();
    const newEntity: Engine.EntityProps = {
      id,
      name: "New Entity",
      geometry: 'box',
      material: 'normal',
      children: [],
      components: {
        transform: {
          position: {x: 0, y: 0, z: 0},
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        }
      },
    }
    setEntities([...sceneConfig.entities, newEntity]);
    context.addNewEntity(newEntity);
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