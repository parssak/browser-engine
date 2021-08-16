import { useContext, useRef } from "react";
import SceneManager from "../engine/core/SceneManager";
import { SceneContext } from "./SceneContext";

const useScene = () => {
  const ref = useRef<any>();
  const { config, setEntities } = useContext(SceneContext);
  
  const runScene = () => {
    SceneManager.Run(config, ref.current);
  }

  const addEntity = () => {
    setEntities([...config.entities, { name: 'New Entity' }]);
  }

  return { ref, config, runScene, addEntity };
}

export default useScene;