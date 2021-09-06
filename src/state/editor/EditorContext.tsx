import { ReactElement, useEffect, useMemo, useRef } from "react"
import { createContext } from "react"

interface IEditorContext {
  renderElement?: React.MutableRefObject<HTMLDivElement | null>
  localScenePayload: Engine.ScenePayload | null
}

const initialValue: IEditorContext = {
  localScenePayload: null,
}

export const EditorContext = createContext<IEditorContext>(initialValue)

export const EditorProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[]
}) => {
  const renderElement = useRef<HTMLDivElement>(null)
  
  const localScenePayload: Engine.ScenePayload | null = useMemo(() => {
    console.debug("Checking for saves... ")
    const fromLocalStorage = localStorage.getItem("scenePayload")
    if (!fromLocalStorage) return null
    return JSON.parse(fromLocalStorage)
  }, [])

  const contextValue = { renderElement, localScenePayload }

  return <EditorContext.Provider value={contextValue}>{children}</EditorContext.Provider>
}
