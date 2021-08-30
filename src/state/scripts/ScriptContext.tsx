import {  ReactElement, useEffect, useState } from "react"
import { createContext } from "react"
import ScriptCompiler from "../../utils/ScriptCompiler"

interface IScriptContext {
  scripts: Record<string, Engine.Script>
  selectedScript: Engine.Script | undefined
  scriptBody: string
  setScriptBody: (scriptBody: string) => void
  setScripts: (scripts: Record<string, Engine.Script>) => void
  setSelectedScript: (script: Engine.Script | undefined) => void
  compileScripts: () => void
}

const initialValue: IScriptContext = {
  scripts: {},
  selectedScript: undefined,
  scriptBody: "",
  setScriptBody: (scriptBody: string) => {},
  setScripts: (scripts: Record<string, Engine.Script>) => {},
  setSelectedScript: (script: Engine.Script | undefined) => {},
  compileScripts: () => {},
}

export const ScriptContext = createContext<IScriptContext>(initialValue)

export const ScriptProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[]
}) => {
  const [scripts, setScripts] = useState<Record<string, Engine.Script>>({})
  const [selectedScript, setSelectedScript] = useState<Engine.Script | undefined>()
  const [scriptBody, setScriptBody] = useState(selectedScript?.content ?? "")

  const compileScripts = () => {
    ScriptCompiler.CompileScripts(Object.values(scripts));
  }

  useEffect(() => {
    compileScripts()
    console.log('SHOULD COMPILE SCRIPTS')
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
