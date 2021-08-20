import { useContext, useRef } from "react";
// import SceneManager from "../engine/core/SceneManager";
import { SceneContext } from "./SceneContext";
import { v4 as uuidv4 } from 'uuid'

const useScene = () => {
  const ref = useRef<any>();
  const { config, setEntities, selectedEntity, setSelectedEntity } = useContext(SceneContext);

  const runScene = () => {
    // SceneManager.Run(config, ref.current);
  }

  const addEntity = () => {
    const newEntity: Engine.EntityProps = {
      id: uuidv4(),
      name: "New Entity",
      children: [],
      components: {},
    }

    setEntities([...config.entities, newEntity]);
  }

  return { ref, config, runScene, addEntity, selectedEntity, setSelectedEntity };
}

export default useScene;