import { useContext, useMemo} from "react";
import { SceneContext } from "./SceneContext";
import context from "../../engine/core/EngineContext";
import { generateNewEntity } from "../../utils/entity.utils";

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
    const newEntity: Engine.EntityProps = generateNewEntity();
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