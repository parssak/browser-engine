import { useContext, useEffect, useState } from "react";
import context from "../../engine/core/EngineContext";
import SceneManager from "../../engine/core/SceneManager";
import useScene from "../scene/useScene";
import useScripts from "../scripts/useScripts";
import { EditorContext } from "./EditorContext";

const useEditor = () => {
  const { scripts } = useScripts();
  const { sceneConfig } = useScene();
  const { renderElement } = useContext(EditorContext);
  const [isRunning, setIsRunning] = useState(context.isPlaying());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => init(), [renderElement]);

  const init = () => {
    if (!renderElement || !renderElement.current) { return; }
    context.init(renderElement.current);
  }

  const generateScenePayload = (): Engine.ScenePayload => {
    return { sceneConfig, scripts }
  }

  const toggleRun = () => {
    if (!renderElement || !renderElement.current) { return; }
    if (SceneManager.instance.isPlaying) {
      context.runEditMode();
      setIsRunning(false);
      return;
    }
    const payload: Engine.ScenePayload = generateScenePayload();
    context.runPlayMode(payload);
    setIsRunning(true);
  };

  return {
    renderElement,
    isRunning,
    toggleRun
  };
}

export default useEditor;