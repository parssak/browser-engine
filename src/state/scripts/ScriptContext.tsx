import {  ReactElement, useEffect, useState } from "react"
import { createContext } from "react"
import context from "../../engine/core/EngineContext"
import ScriptCompiler from "../../utils/ScriptCompiler"

interface IScriptContext {
  scripts: Record<Engine.ScriptID, Engine.Script>
  selectedScript: Engine.Script | undefined
  scriptBody: string
  setScriptBody: (scriptBody: string) => void
  setScripts: (scripts: Record<Engine.ScriptID, Engine.Script>) => void
  setSelectedScript: (script: Engine.Script | undefined) => void
  compileScripts: () => void
}

const initialValue: IScriptContext = {
  scripts: {},
  selectedScript: undefined,
  scriptBody: "",
  setScriptBody: (scriptBody: string) => {},
  setScripts: (scripts: Record<Engine.ScriptID, Engine.Script>) => {},
  setSelectedScript: (script: Engine.Script | undefined) => {},
  compileScripts: () => {},
}

export const ScriptContext = createContext<IScriptContext>(initialValue)

export let scriptBody = ""
export const setScriptBody = (val: string) => {
  scriptBody = val
}
export const ScriptProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[]
}) => {
  const [scripts, setScripts] = useState<Record<Engine.ScriptID, Engine.Script>>({})
  const [selectedScript, setSelectedScript] = useState<Engine.Script | undefined>()

  const compileScripts = () => {
    context.compileScripts(Object.values(scripts))
  }

  useEffect(() => {
    compileScripts()
  }, [scripts])

  const contextValue = {
    scripts,
    setScripts,
    scriptBody,
    setScriptBody,
    selectedScript,
    setSelectedScript,
    compileScripts,
  }

  return (
    <ScriptContext.Provider value={contextValue}>{children}</ScriptContext.Provider>
  )
}
