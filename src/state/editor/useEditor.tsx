import { useContext, useEffect } from "react";
import useScene from "../scene/useScene";
import useScripts from "../scripts/useScripts";
import { EditorContext } from "./EditorContext";

const useEditor = () => {
  const { scripts } = useScripts();
  const { sceneConfig } = useScene();
  const { renderElement } = useContext(EditorContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => init(), [renderElement]);

  const init = () => {
    if (!renderElement || !renderElement.current) { return; }
    console.debug('ran init!');
    const sceneManager = new Engine.SceneManager();
    // TODO: Implement this
    // Engine.Initialize(localConfig, renderElement);
  }

  const generateScenePayload = (): Engine.ScenePayload => {
    return { sceneConfig, scripts }
  }

  const toggleRun = () => {
    if (!renderElement || !renderElement.current) { return; }
    if (Engine.SceneManager.instance.isRunning) {
      Engine.SceneManager.Stop();
      return;
    }
    const payload: Engine.ScenePayload = generateScenePayload();
    Engine.SceneManager.Run(payload, renderElement.current);
  };

  // const isRunning = Engine.SceneManager.instance.isRunning;


  return {
    renderElement,
    // isRunning,
    toggleRun
  };
}

export default useEditor;