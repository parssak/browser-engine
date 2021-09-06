import { useContext, useEffect, useMemo, useState } from "react"
import context from "../../engine/core/EngineContext"
import SceneManager from "../../engine/core/SceneManager"
import useScene from "../scene/useScene"
import useScripts from "../scripts/useScripts"
import { EditorContext } from "./EditorContext"

const useEditor = (rootHook?: boolean) => {
  const { scripts, _setScripts } = useScripts()
  const { sceneConfig, selectEntity, _setEntities, _setMaterials, _setCameraProps } =
    useScene()
  const { renderElement, localScenePayload } = useContext(EditorContext)
  const [isRunning, setIsRunning] = useState(context.isPlaying())

  useEffect(() => {
    if (!localScenePayload || !rootHook) return

    const scriptsPayload = Object.fromEntries(
      localScenePayload.scripts.map((s) => [s.id, s])
    )
    _setScripts(scriptsPayload)

    _setEntities(localScenePayload.sceneConfig.entities)

    const materialsPayload = Object.fromEntries(
      localScenePayload.sceneConfig.materials.map((m) => [m.id, m])
    )
    _setMaterials(materialsPayload)

    _setCameraProps(localScenePayload.sceneConfig.camera)

    context.updateScenePayload(localScenePayload, true)
  }, [_setCameraProps, _setEntities, _setMaterials, _setScripts, localScenePayload, rootHook])


  const scenePayload: Engine.ScenePayload = useMemo(
    () => ({ sceneConfig, scripts }),
    [sceneConfig, scripts]
  )
  
  useEffect(() => {
    const init = () => {
      if (!renderElement || !renderElement.current || !scenePayload || !rootHook)  {
        return
      }
      context.init(renderElement.current, scenePayload)
    }
    init()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderElement, rootHook])

  const toggleRun = () => {
    if (!renderElement || !renderElement.current) {
      return
    }
    if (SceneManager.isPlaying()) {
      setIsRunning(false)
      context.runEditMode()
      return
    }
    context.updateScenePayload(scenePayload)
    context.runPlayMode()
    setIsRunning(true)
  }

  const handleClickScene = (e: React.MouseEvent) => {
    const canvas: HTMLCanvasElement = e.target as unknown as HTMLCanvasElement
    canvas.focus()
    const domRect: DOMRect = canvas.getBoundingClientRect()
    const [mouseX, mouseY]: [number, number] = [
      ((e.clientX - domRect.x) / domRect.width) * 2 - 1,
      -((e.clientY - domRect.y) / domRect.height) * 2 + 1,
    ]
    context.handleClick(mouseX, mouseY)
    selectEntity(context.getSelectedEntity() ?? "")
  }

  const saveScene = () => {
    localStorage.setItem("scenePayload", JSON.stringify(scenePayload))
  }

  return {
    renderElement,
    isRunning,
    toggleRun,
    handleClickScene,
    saveScene,
  }
}

export default useEditor
