import { useContext, useRef } from "react";
import SceneManager from "../engine/core/SceneManager";
import { SceneContext } from "./SceneContext";

const useScene = () => {
  const ref = useRef<any>();
  const { config } = useContext(SceneContext);
  
  const runScene = () => {
    console.debug('running scene from UI');
    SceneManager.Run(config, ref.current);
  }

  return { ref, runScene };
}

export default useScene;