import { useContext, useEffect, useState } from "react";
import SceneManager from "../../engine/core/SceneManager";
import useScene from "../scene/useScene";
import useScripts from "../scripts/useScripts";
import { EditorContext } from "./EditorContext";

const useEditor = () => {
  const { scripts } = useScripts();
  const { sceneConfig } = useScene();
  const { renderElement } = useContext(EditorContext);
  const [isRunning, setIsRunning] = useState(SceneManager.isRunning);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => init(), [renderElement]);

  const init = () => {
    if (!renderElement || !renderElement.current) { return; }
    SceneManager.Initialize(renderElement.current);
  }

  const generateScenePayload = (): Engine.ScenePayload => {
    return { sceneConfig, scripts }
  }

  const toggleRun = () => {
    if (!renderElement || !renderElement.current) { return; }
    if (SceneManager.isRunning) {
      console.debug('stopping scene');
      SceneManager.Stop();
      setIsRunning(false);
      return;
    }
    console.debug('Going to run scene...')
    const payload: Engine.ScenePayload = generateScenePayload();
    console.debug('Made payload:', payload)
    SceneManager.Run(payload);
    setIsRunning(true);
  };

  return {
    renderElement,
    isRunning,
    toggleRun
  };
}

export default useEditor;