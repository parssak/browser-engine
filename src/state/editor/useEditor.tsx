import { useContext, useEffect, useMemo, useState } from "react";
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

  const scenePayload = useMemo(() => ({ sceneConfig, scripts }), [sceneConfig, scripts]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => init(), [renderElement, sceneConfig]);

  const init = () => {
    if (!renderElement || !renderElement.current || !scenePayload) { return; }
    context.init(renderElement.current, scenePayload);
  }

  useEffect(() => {
    console.debug('updating scene payload', scenePayload);
    context.updateScenePayload(scenePayload);
  }, [scenePayload])

  const toggleRun = () => {
    if (!renderElement || !renderElement.current) { return; }
    if (SceneManager.instance.isPlaying) {
      context.runEditMode();
      setIsRunning(false);
      return;
    }
    context.runPlayMode();
    setIsRunning(true);
  };

  return {
    renderElement,
    isRunning,
    toggleRun
  };
}

export default useEditor;