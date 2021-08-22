import { useContext, useMemo} from "react";
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
    return sceneConfig.entities.find(e => e.id === selectedEntityID) ?? null;
  }, [sceneConfig, selectedEntityID]);

  const updateEntity = (entity: Engine.EntityProps) => {
    const index = sceneConfig.entities.findIndex(e => e.id === entity.id);
    if (index === -1) {
      console.error("Couldn't find " + entity.id + " in sceneConfig.entities");
    };
    sceneConfig.entities[index] = entity;
    setEntities(sceneConfig.entities);
    // TODO: Make sure actual scene updates when doing this
  }

  const updateEntityParent = (child: Engine.EntityID, newParent: Engine.EntityID | null) => {
    // TODO: Implement this
  }

  const createEntity = () => {
    const newEntity: Engine.EntityProps = {
      id: uuidv4(),
      name: "New Entity",
      geometry: 'box',
      material: 'normal',
      children: [],
      components: {
        transform: {
          position: [0,0,0],
          rotation: [0,0,0],
          scale: [1,1,1],
        }
      },
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