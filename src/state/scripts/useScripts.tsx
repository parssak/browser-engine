import { useContext, useEffect, useState } from "react"
import { generateNewScript } from "../../utils/script.utils"
import { ScriptContext } from "./ScriptContext"

const useScripts = () => {
  const {
    scripts,
    setScripts,
    selectedScript,
    setSelectedScript,
    compileScripts,
    scriptBody,
    setScriptBody,
  } = useContext(ScriptContext)

  const loadScript = (scriptName: string) => {
    const foundScript = scripts[scriptName]
    setSelectedScript(foundScript)
    setScriptBody(foundScript?.content ?? "")
  }

  const saveScript = (script: Engine.Script) => {
    const foundScript = Object.values(scripts).find((s) => s.id === script.id)
    if (!foundScript) return
    foundScript.content = scriptBody;
    compileScripts()
  }

  const createScript = (name: string, language: Engine.Language, type: Engine.ScriptType): Engine.Script => {
    const newScript = generateNewScript(name, language, type)
    setScripts({ ...scripts, [newScript.name]: newScript })
    return newScript;
  }

  return {
    scripts: Object.values(scripts),
    setScripts,
    scriptBody,
    setScriptBody,
    selectedScript,
    setSelectedScript,
    loadScript,
    saveScript,
    createScript,
  }
}

export default useScripts
