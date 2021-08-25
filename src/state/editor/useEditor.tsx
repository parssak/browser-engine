import { useCallback, useContext, useEffect, useMemo, useState } from "react";
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

  const init = useCallback(() => {
    if (!renderElement || !renderElement.current || !scenePayload) { return; }
    context.init(renderElement.current, scenePayload);
  }, [renderElement, scenePayload]);


  useEffect(() => init(), [renderElement, init]);

  useEffect(() => {
    context.updateScenePayload(scenePayload);
  }, [scenePayload])

  const toggleRun = () => {
    if (!renderElement || !renderElement.current) { return; }
    if (SceneManager.isPlaying()) {
      setIsRunning(false);
      context.runEditMode();
      return;
    }
    context.runPlayMode();
    setIsRunning(true);
  };

  const handleClickScene = (e: React.MouseEvent) => {
    const canvas: HTMLCanvasElement = e.target as unknown as HTMLCanvasElement;
    const domRect: DOMRect = canvas.getBoundingClientRect();
    const [mouseX, mouseY]: [number, number] = [((e.clientX - domRect.x) / domRect.width) * 2 - 1, -((e.clientY - domRect.y) / domRect.height) * 2 + 1];
    context.handleClick(mouseX, mouseY);
  }

  return {
    renderElement,
    isRunning,
    toggleRun,
    handleClickScene
  };
}

export default useEditor;